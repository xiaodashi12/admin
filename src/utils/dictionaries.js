//用户类型字典
export const customerType = {
    '1': '个人',
    '2': '企业',
    '3': '事业或政府单位'
}

//用户类型
export function getCustomerType(val) {
    return customerType[val] || ''
}
//用户性别
export const customerGender = {
    '1': '男',
    '2': '女'
}

//用户性别
export function getCustomerGender(val) {
    return customerGender[val] || ''
}

//证件类型字典
export const certificatesType = {
    '1': '身份证',
    '2': '军官证',
    '3': '经营执照编码',
    '4': '机构代码证',
    '5': '香港身份证',
    '6': '护照',
    '7': '台胞证'
}

//证件类型
export function getCertificatesType(val) {
    return certificatesType[val] || ''
}

//单位级别字典
export const companyLevel = {
    '0': '省',
    '1': '市',
    '2': '县'
}

//获取单位级别
export function getCompanyLevel(val) {
    return companyLevel[val] || '';
}

//OBU状态字典
export const obuStatus = {
    '0': '未发行',
    '1': '已发行',
    '3': '故障',
    '5': '已注销',
}

//图片尺寸字典
export const imgSize = {
    'O': '原图',
    'L': '大图',
    'S': '缩略图'
}

//图片尺寸
export function getImgSize(val) {
    return imgSize[val] || ''
}

//OCR类型字典
export const ocrType = {
    '1': '身份证',
    '2': '营业执照',
    '3': '护照',
    '4': '行驶证'
}

//OCR类型
export function getOcrType(val) {
    return ocrType[val] || ''
}

//车牌省份字典
export const provinces = {
    "浙": '浙',
    '沪': '沪',
    '苏': '苏',
    '皖': '皖',
    '赣': '赣',
    '闽': '闽',
    '京': '京',
    '津': '津',
    '渝': '渝',
    '冀': '冀',
    '豫': '豫',
    '云': '云',
    '辽': '辽',
    '黑': '黑',
    '湘': '湘',
    '鲁': '鲁',
    '新': '新',
    '鄂': '鄂',
    '桂': '桂',
    '甘': '甘',
    '晋': '晋',
    '蒙': '蒙',
    '陕': '陕',
    '吉': '吉',
    '贵': '贵',
    '粤': '粤',
    '青': '青',
    '藏': '藏',
    '川': '川',
    '宁': '宁',
    '琼': '琼',
    '使': '使',
    '领': '领',
}

//车牌省份
export function getProvince(val) {
    return provinces[val] || ''
}


//城市列表
export const cities = [
    {city_code: "0282", parent_code: "02", city_name: "慈溪"},
    {city_code: "0382", parent_code: "03", city_name: "乐清"},
    {city_code: "0683", parent_code: "06", city_name: "嵊州"},
    {city_code: "0800", parent_code: "08", city_name: "衢州市区"},
    {city_code: "1021", parent_code: "10", city_name: "玉环"},
    {city_code: "0900", parent_code: "09", city_name: "舟山市区"},
    {city_code: "31", parent_code: "99", city_name: "上海"},
    {city_code: "12", parent_code: "0", city_name: "外省市"},
    {city_code: "0281", parent_code: "02", city_name: "余姚"},
    {city_code: "06", parent_code: "0", city_name: "绍兴市"},
    {city_code: "0211", parent_code: "02", city_name: "镇海"},
    {city_code: "0300", parent_code: "03", city_name: "温州市区"},
    {city_code: "0621", parent_code: "06", city_name: "绍兴县"},
    {city_code: "0521", parent_code: "05", city_name: "德清"},
    {city_code: "0481", parent_code: "04", city_name: "海宁"},
    {city_code: "0723", parent_code: "07", city_name: "武义"},
    {city_code: "0784", parent_code: "07", city_name: "永康"},
    {city_code: "1081", parent_code: "10", city_name: "温岭"},
    {city_code: "1023", parent_code: "10", city_name: "天台"},
    {city_code: "34", parent_code: "99", city_name: "安徽"},
    {city_code: "0100", parent_code: "01", city_name: "杭州市区"},
    {city_code: "0182", parent_code: "01", city_name: "建德"},
    {city_code: "0127", parent_code: "01", city_name: "淳安"},
    {city_code: "08", parent_code: "0", city_name: "衢州市"},
    {city_code: "0324", parent_code: "03", city_name: "永嘉"},
    {city_code: "0327", parent_code: "03", city_name: "苍南"},
    {city_code: "0600", parent_code: "06", city_name: "绍兴市区"},
    {city_code: "0522", parent_code: "05", city_name: "长兴"},
    {city_code: "0700", parent_code: "07", city_name: "金华市区"},
    {city_code: "0822", parent_code: "08", city_name: "常山"},
    {city_code: "1181", parent_code: "11", city_name: "龙泉"},
    {city_code: "1126", parent_code: "11", city_name: "庆元"},
    {city_code: "0922", parent_code: "09", city_name: "嵊泗"},
    {city_code: "0183", parent_code: "01", city_name: "富阳"},
    {city_code: "0185", parent_code: "01", city_name: "临安"},
    {city_code: "0122", parent_code: "01", city_name: "桐庐"},
    {city_code: "0212", parent_code: "02", city_name: "鄞州"},
    {city_code: "0", parent_code: "", city_name: "浙江"},
    {city_code: "02", parent_code: "0", city_name: "宁波市"},
    {city_code: "11", parent_code: "0", city_name: "丽水市"},
    {city_code: "10", parent_code: "0", city_name: "台州市"},
    {city_code: "0283", parent_code: "02", city_name: "奉化"},
    {city_code: "0206", parent_code: "02", city_name: "北仑"},
    {city_code: "0400", parent_code: "04", city_name: "嘉兴市区"},
    {city_code: "1024", parent_code: "10", city_name: "仙居"},
    {city_code: "1123", parent_code: "11", city_name: "遂昌"},
    {city_code: "0110", parent_code: "01", city_name: "余杭"},
    {city_code: "0200", parent_code: "02", city_name: "宁波市区"},
    {city_code: "09", parent_code: "0", city_name: "舟山市"},
    {city_code: "0381", parent_code: "03", city_name: "瑞安"},
    {city_code: "0825", parent_code: "08", city_name: "龙游"},
    {city_code: "1125", parent_code: "11", city_name: "云和"},
    {city_code: "1122", parent_code: "11", city_name: "缙云"},
    {city_code: "0921", parent_code: "09", city_name: "岱山"},
    {city_code: "32", parent_code: "99", city_name: "江苏"},
    {city_code: "36", parent_code: "99", city_name: "江西"},
    {city_code: "0225", parent_code: "02", city_name: "象山"},
    {city_code: "0326", parent_code: "03", city_name: "平阳"},
    {city_code: "0329", parent_code: "03", city_name: "泰顺"},
    {city_code: "0328", parent_code: "03", city_name: "文成"},
    {city_code: "0322", parent_code: "03", city_name: "洞头"},
    {city_code: "0682", parent_code: "06", city_name: "上虞"},
    {city_code: "0482", parent_code: "04", city_name: "平湖"},
    {city_code: "0424", parent_code: "04", city_name: "海盐"},
    {city_code: "0483", parent_code: "04", city_name: "桐乡"},
    {city_code: "0881", parent_code: "08", city_name: "江山"},
    {city_code: "0824", parent_code: "08", city_name: "开化"},
    {city_code: "1000", parent_code: "10", city_name: "台州市区"},
    {city_code: "1100", parent_code: "11", city_name: "丽水市区"},
    {city_code: "05", parent_code: "0", city_name: "湖州市"},
    {city_code: "07", parent_code: "0", city_name: "金华市"},
    {city_code: "0226", parent_code: "02", city_name: "宁海"},
    {city_code: "0681", parent_code: "06", city_name: "诸暨"},
    {city_code: "0624", parent_code: "06", city_name: "新昌"},
    {city_code: "0421", parent_code: "04", city_name: "嘉善"},
    {city_code: "0781", parent_code: "07", city_name: "兰溪"},
    {city_code: "0782", parent_code: "07", city_name: "义乌"},
    {city_code: "1121", parent_code: "11", city_name: "青田"},
    {city_code: "0109", parent_code: "01", city_name: "萧山"},
    {city_code: "01", parent_code: "0", city_name: "杭州市"},
    {city_code: "03", parent_code: "0", city_name: "温州市"},
    {city_code: "04", parent_code: "0", city_name: "嘉兴市"},
    {city_code: "0500", parent_code: "05", city_name: "湖州市区"},
    {city_code: "0523", parent_code: "05", city_name: "安吉"},
    {city_code: "0783", parent_code: "07", city_name: "东阳"},
    {city_code: "0727", parent_code: "07", city_name: "磐安"},
    {city_code: "0726", parent_code: "07", city_name: "蒲江"},
    {city_code: "1082", parent_code: "10", city_name: "临海"},
    {city_code: "1022", parent_code: "10", city_name: "三门"},
    {city_code: "1127", parent_code: "11", city_name: "景宁"},
    {city_code: "1124", parent_code: "11", city_name: "松阳"},
    {city_code: "33", parent_code: "99", city_name: "浙江"},
    {city_code: "1200", parent_code: "12", city_name: "外省市"},
    {city_code: "0207", parent_code: "02", city_name: "大榭"},
]

