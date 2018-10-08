window.clayFrame = {
    "name": "架构图",
    "content": [{
        "name": "结点操作",
        "content": [{
            "name": "结点查找",
            "content": [{
                "name": "简单的css选择器查找"
            }, {
                "name": "结点生成（svg和html等标签会自动识别命名空间）"
            }, {
                "name": "find方法"
            }]
        }, {
            "name": "结点编辑",
            "content": [{
                "name": "css（除了类似jquery的操作，还可以结合数据绑定进行操作）"
            }, {
                "name": "attr（特殊属性会自动失败命名空间，可以结合数据绑定进行操作）"
            }, {
                "name": "其它一些常规操作（只提供绘图必须的）"
            }]
        }, {
            "name": "数据绑定",
            "content": [{
                "name": "datum（单一的数据绑定和获取）"
            }, {
                "name": "data（一组数据和一组结点的绑定和获取）"
            }, {
                "name": "enter（把过滤出来多于结点的数据部分变成结点返回）"
            }, {
                "name": "exit（把过滤出来多于数据的结点部分返回）"
            }]
        }, {
            "name": "事件",
            "content": [{
                "name": "基本操作"
            }, {
                "name": "针对canvas计算"
            }]
        }]
    }, {
        "name": "常用工具",
        "content": [{
            "name": "间隔执行（动画）"
        }, {
            "name": "颜色统一转换"
        }, {
            "name": "色彩获取"
        }, {
            "name": "最值计算"
        }, {
            "name": "非数据绑定轮询执行"
        }]
    }, {
        "name": "数学计算",
        "content": [{
            "name": "Hermite插值法"
        }, {
            "name": "Cardinal插值法"
        }, {
            "name": "3D移动（沿着向量）"
        }, {
            "name": "3D缩放（围绕一个中心点）"
        }, {
            "name": "3D旋转（围绕一条射线）"
        }]
    }, {
        "name": "物理计算"
    }, {
        "name": "映射计算",
        "content": [{
            "name": "地图坐标映射",
            "content": [{
                "name": "Lambert法"
            }]
        }]
    }, {
        "name": "布局计算",
        "content": [{
            "name": "树布局"
        }, {
            "name": "力布局"
        }]
    }, {
        "name": "绘图方法",
        "content": [{
            "name": "图形绘制统一计算",
            "content": [{
                "name": "扇形计算"
            }, {
                "name": "刻度尺计算"
            }]
        }, {
            "name": "Canvas",
            "content": [{
                "name": "canvas对象",
                "content": [{
                    "name": "对象和配置维护"
                }, {
                    "name": "图层维护"
                }]
            }, {
                "name": "Canvas扇形"
            }, {
                "name": "Canvas直线刻度尺"
            }, {
                "name": "Canvas弧形刻度尺"
            }]
        }, {
            "name": "SVG",
            "content": [{
                "name": "SVG扇形"
            }, {
                "name": "SVG直线刻度尺"
            }, {
                "name": "SVG弧形刻度尺"
            }]
        }, {
            "name": "webGL"
        }]
    }]
};
