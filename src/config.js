/**
 * 命名空间路径
 * ==========================
 */

var _namespace = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};

/**
 * 正则相关
 * ==========================
 */

// 空格
// http://www.w3.org/TR/css3-selectors/#whitespace
var _regexp_whitespace = "[\\x20\\t\\r\\n\\f]";

// 标志符
// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
var _regexp_identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+";

/**
 * 兼容性标记
 * ==========================
 */

// 记录需要使用xlink命名空间常见的xml属性
var _xlink = ["href", "title", "show", "type", "role", "actuate"];

// 记录不同浏览器对webgl的别名
var _webgl_types = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

/**
 * 全局挂载
 * ==========================
 */

// 嵌入内部提供者
var _provider = {};

/**
 * 常用对象
 * ==========================
 */

// canvas 2d
var _canvas_2d = CanvasRenderingContext2D;
// clay 原型
var _clay_prototype = clay.prototype;

/**
 * 提示文字
 * ==========================
 */

// 不支持的选择器
var _tips_error_selector = "Unsupported selector!";

// 不支持的参数
var _tips_error_parameter = 'Unsupported parameter!';
