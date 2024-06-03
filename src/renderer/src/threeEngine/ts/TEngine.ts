import {
    PerspectiveCamera,
    WebGLRenderer,
    Scene,
    Object3D,
    AxesHelper,
    GridHelper,
    Vector3,
    Vector2,
    Raycaster,
    Mesh,
    Color,
    Fog,
    OrthographicCamera,
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min'

import { SelectedGeometry } from './Selected'
import { BasicObject } from './BasicObject'
import { GUIConfig } from './GUIConfig'

type options = {
    helper?: boolean //网格工具
    antialias?: boolean //是否开启抗锯齿
    stats?: boolean //是否打开性能检测
    orbitControls?: boolean //轨道控制是否打开
}
export class TEngine {
    dom: HTMLElement
    renderer: WebGLRenderer //渲染器
    camera: PerspectiveCamera | OrthographicCamera //相机
    cameraOrtho: OrthographicCamera //平行相机
    cameraPersp: PerspectiveCamera //透视相机
    scene: Scene //场景
    renderAnimation: () => void //场景物体动画回调函数
    stats: Stats | undefined //状态显示器
    orbitControls: OrbitControls | undefined //轨道控制
    pointer: Vector2 //鼠标位置
    raycaster: Raycaster //射线查询
    selectedGeometry: SelectedGeometry //选中的物体
    gui: any //GUI，交互界面
    BO: BasicObject //基本物体
    onWindowResize: () => void

    constructor(dom: HTMLElement, animate?: () => void, options?: options) {
        //dom挂载点
        this.dom = dom

        //渲染器
        this.renderer = new WebGLRenderer({
            antialias: options //抗锯齿选项
                ? options.antialias
                    ? options.antialias
                    : false //抗锯齿默认关闭
                : false,
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
        this.cameraOrtho = new OrthographicCamera(
            -dom.offsetWidth / 120,
            dom.offsetWidth / 120,
            dom.offsetHeight / 120,
            -dom.offsetHeight / 120,
            -1000,
            3000,
        )
        this.camera = this.cameraPersp
        this.camera.position.set(30, 30, 30) //相机初始位置
        this.cameraOrtho.position.set(150, 150, 150)
        this.camera.lookAt(new Vector3(0, 0, 0)) //相机观察位置

        //场景
        this.scene = new Scene()
        this.scene.background = new Color(0x666666)
        this.scene.fog = new Fog(0x666666, 1, 1000)

        //动画函数  //默认为空
        this.renderAnimation = animate ? animate : () => { }

        //性能监视器
        this.stats = options ? (options.stats ? Stats() : undefined) : undefined //添加性能监视器
        if (this.stats) {
            const statsDom = this.stats.domElement
            //设置性能监视器的样式
            statsDom.style.position = 'absolute'
            statsDom.style.top = '5px'
            statsDom.style.right = 'unset'
            statsDom.style.left = '5px'
            dom.appendChild(statsDom)
        }

        //轨道控制
        this.orbitControls = options
            ? options.orbitControls
                ? new OrbitControls(this.camera, this.renderer.domElement)
                : undefined
            : undefined
        if (this.orbitControls) {
            this.orbitControls.target = new Vector3(0, 0, 0)
            // orbitControls.zoomSpeed = 0.25//缩放速度控制
            // orbitControls.rotateSpeed = 0.3//旋转速度控制
            // orbitControls.panSpeed = 0.25//平移速度控制
        }

        //坐标轴和网格工具
        const helper = options
            ? options.helper
                ? {
                    axesHelper: new AxesHelper(5000), //添加坐标轴
                    gridHelper: new GridHelper(10000, 1000), //添加坐标网格
                }
                : undefined
            : undefined
        if (helper) {
            this.scene.add(helper.axesHelper)
            this.scene.add(helper.gridHelper)
        }
        // 基本物体
        this.BO = new BasicObject()

        //GUI
        this.gui = new GUI()
        this.gui.close()
        new GUIConfig(this.gui, this)

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

            //判断物体是否为三角网
            if (objSelected.type === 'Mesh') {
                if (event.button == 0) {
                    //左键点击
                    this.selectedGeometry.add(objSelected as Mesh)
                }
                if (event.button == 2) {
                    //右键点击
                    this.selectedGeometry.remove(objSelected as Mesh)
                }
            }
        }
        dom.addEventListener('pointerdown', onPointerDown)

        //渲染入口
        const renderFun = () => {
            this.renderAnimation() //物体动画更新
            this.orbitControls?.update() //轨道控制更新
            this.stats?.update() //状态监视器更新
            this.renderer.render(this.scene, this.camera) //渲染场景和相机
            requestAnimationFrame(renderFun) //渲染回调
        }

        //窗口大小重新调整，响应式变动
        this.onWindowResize = () => {
            this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true) //设置新的大小
            const aspect = dom.offsetWidth / dom.offsetHeight
            this.cameraPersp.aspect = aspect
            this.cameraPersp.updateProjectionMatrix()

            this.cameraOrtho.left = this.cameraOrtho.bottom * aspect
            this.cameraOrtho.right = this.cameraOrtho.top * aspect
            this.cameraOrtho.updateProjectionMatrix()
        }
        window.addEventListener('resize', this.onWindowResize)

        //定义射线查询和材质更替
        this.raycaster = new Raycaster()
        this.pointer = new Vector2()
        this.selectedGeometry = new SelectedGeometry(this)

        renderFun()
    }

    addobj(objArr: Array<Object3D>) {
        objArr.forEach((obj) => {
            if (obj.parent) return
            this.scene.add(obj)
        })
    }

    removeobj(objArr: Array<Object3D>) {
        objArr.forEach((obj) => {
            if (obj.parent) {
                this.scene.remove(obj)
            } else {
                const id = obj.id
                console.warn(`object:${{ id }} is not in scene`)
            }
        })
    }

    getSelectedObject(): {} {
        return this.selectedGeometry.getSelectGeometry()
    }
}
