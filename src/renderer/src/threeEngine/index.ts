import {
    PerspectiveCamera,
    WebGLRenderer,
    Scene,
    AxesHelper,
    GridHelper,
    Vector3,
    Vector2,
    Raycaster,
    Mesh,
    Color,
    Fog,
    OrthographicCamera,
    PlaneGeometry,
    MeshBasicMaterial,
    TextureLoader,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export class TEngine {
    dom: HTMLElement
    renderer: WebGLRenderer //渲染器
    camera: PerspectiveCamera | OrthographicCamera //相机
    cameraPersp: PerspectiveCamera //透视相机
    scene: Scene //场景
    orbitControls: OrbitControls | undefined //轨道控制
    pointer: Vector2 //鼠标位置
    raycaster: Raycaster //射线查询
    onWindowResize: () => void

    constructor(dom: HTMLElement) {
        //dom挂载点
        this.dom = dom

        //渲染器
        this.renderer = new WebGLRenderer({
            antialias: true,
        })
        this.renderer.setPixelRatio(window.devicePixelRatio) //设置像素比为浏览器支持的像素比
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true) //设置渲染器的大小，和更新状态
        dom.appendChild(this.renderer.domElement) //将渲染器的画面追加到dom中

        //相机
        this.cameraPersp = new PerspectiveCamera( //透视相机
            75, //FOV角度
            dom.offsetWidth / dom.offsetHeight, //宽高比
            1, //近切面
            20000, //远切面
        )

        this.camera = this.cameraPersp
        this.camera.position.set(200, 0, 200) //相机初始位置
        this.camera.lookAt(new Vector3(0, 1, 0)) //相机观察位置

        //场景
        this.scene = new Scene()
        this.scene.background = new Color(0xffffff)
        this.scene.fog = new Fog(0x666666, 1, 5000)

        //坐标轴和网格工具
        const helper = {
            axesHelper: new AxesHelper(5000), //添加坐标轴
            gridHelper: new GridHelper(10000, 1000), //添加坐标网格
        }
        if (helper) {
            this.scene.add(helper.axesHelper)
            // this.scene.add(helper.gridHelper)
        }

        //阻止原本的右键操作
        document.oncontextmenu = function (e) {
            e.preventDefault()
        }

        //鼠标点击
        const onPointerDown = (event: MouseEvent) => {
            console.log(this.scene.children)
            // console.log(this.camera)
            //获取点击位置
            this.pointer.set(
                (event.offsetX / dom.offsetWidth) * 2 - 1,
                -(event.offsetY / dom.offsetHeight) * 2 + 1,
            )
            this.raycaster.setFromCamera(this.pointer, this.camera) //设置射线查询

            //获取相交物体
            const intersects = this.raycaster.intersectObjects(
                this.scene.children,
                false, //不返回子物体
            )
            if (!(intersects.length > 0)) return //没有相交物体
            const objSelected = intersects[0].object //获取相交的第一个物体
            console.log(objSelected)

        }
        dom.addEventListener('pointerdown', onPointerDown)

        //渲染入口
        const renderFun = () => {
            this.orbitControls?.update() //轨道控制更新
            this.renderer.render(this.scene, this.camera) //渲染场景和相机
            requestAnimationFrame(renderFun) //渲染回调
        }

        //窗口大小重新调整，响应式变动
        this.onWindowResize = () => {
            this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true) //设置新的大小
            const aspect = dom.offsetWidth / dom.offsetHeight
            this.cameraPersp.aspect = aspect
            this.cameraPersp.updateProjectionMatrix()
        }
        window.addEventListener('resize', this.onWindowResize)

        //定义射线查询和材质更替
        this.raycaster = new Raycaster()
        this.pointer = new Vector2()

        renderFun()
    }

    addPlaneGeometry(size = { width: 10, height: 10 }, url: string) {
        const geometry = new PlaneGeometry(size.width, size.height); // 定义平面大小
        const material = new MeshBasicMaterial({
            map: new TextureLoader().load(url) // 加载纹理图片
        });
        const plane = new Mesh(geometry, material);
        this.scene.add(plane);
    }
}
