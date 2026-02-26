import { invoke } from '@tauri-apps/api';
export var champDict:
  { [key: string]: { img_path:string, champId: string, label: string, alias: string, title: string } } =
  {
    '1':  {'img_path':'','champId': '1', 'label': '黑暗之女', 'alias': 'Annie', 'title': '安妮'},
    '2':  {'img_path':'','champId': '2', 'label': '狂战士', 'alias': 'Olaf', 'title': '奥拉夫'},
    '3':  {'img_path':'','champId': '3', 'label': '正义巨像', 'alias': 'Galio', 'title': '加里奥'},
    '4':  {'img_path':'','champId': '4', 'label': '卡牌大师', 'alias': 'TwistedFate', 'title': '崔斯特'},
    '5':  {'img_path':'','champId': '5', 'label': '德邦总管', 'alias': 'XinZhao', 'title': '赵信'},
    '6':  {'img_path':'','champId': '6', 'label': '无畏战车', 'alias': 'Urgot', 'title': '厄加特'},
    '7':  {'img_path':'','champId': '7', 'label': '诡术妖姬', 'alias': 'Leblanc', 'title': '乐芙兰'},
    '8':  {'img_path':'','champId': '8', 'label': '猩红收割者', 'alias': 'Vladimir', 'title': '弗拉基米尔'},
    '9':  {'img_path':'','champId': '9', 'label': '远古恐惧', 'alias': 'Fiddlesticks', 'title': '费德提克'},
    '10':  {'img_path':'','champId': '10', 'label': '正义天使', 'alias': 'Kayle', 'title': '凯尔'},
    '11':  {'img_path':'','champId': '11', 'label': '无极剑圣', 'alias': 'MasterYi', 'title': '易'},
    '12':  {'img_path':'','champId': '12', 'label': '牛头酋长', 'alias': 'Alistar', 'title': '阿利斯塔'},
    '13':  {'img_path':'','champId': '13', 'label': '符文法师', 'alias': 'Ryze', 'title': '瑞兹'},
    '14':  {'img_path':'','champId': '14', 'label': '亡灵战神', 'alias': 'Sion', 'title': '赛恩'},
    '15':  {'img_path':'','champId': '15', 'label': '战争女神', 'alias': 'Sivir', 'title': '希维尔'},
    '16':  {'img_path':'','champId': '16', 'label': '众星之子', 'alias': 'Soraka', 'title': '索拉卡'},
    '17':  {'img_path':'','champId': '17', 'label': '迅捷斥候', 'alias': 'Teemo', 'title': '提莫'},
    '18':  {'img_path':'','champId': '18', 'label': '麦林炮手', 'alias': 'Tristana', 'title': '崔丝塔娜'},
    '19':  {'img_path':'','champId': '19', 'label': '祖安怒兽', 'alias': 'Warwick', 'title': '沃里克'},
    '20':  {'img_path':'','champId': '20', 'label': '雪原双子', 'alias': 'Nunu', 'title': '努努和威朗普'},
    '21':  {'img_path':'','champId': '21', 'label': '赏金猎人', 'alias': 'MissFortune', 'title': '厄运小姐'},
    '22':  {'img_path':'','champId': '22', 'label': '寒冰射手', 'alias': 'Ashe', 'title': '艾希'},
    '23':  {'img_path':'','champId': '23', 'label': '蛮族之王', 'alias': 'Tryndamere', 'title': '泰达米尔'},
    '24':  {'img_path':'','champId': '24', 'label': '武器大师', 'alias': 'Jax', 'title': '贾克斯'},
    '25':  {'img_path':'','champId': '25', 'label': '堕落天使', 'alias': 'Morgana', 'title': '莫甘娜'},
    '26':  {'img_path':'','champId': '26', 'label': '时光守护者', 'alias': 'Zilean', 'title': '基兰'},
    '27':  {'img_path':'','champId': '27', 'label': '炼金术士', 'alias': 'Singed', 'title': '辛吉德'},
    '28':  {'img_path':'','champId': '28', 'label': '痛苦之拥', 'alias': 'Evelynn', 'title': '伊芙琳'},
    '29':  {'img_path':'','champId': '29', 'label': '瘟疫之源', 'alias': 'Twitch', 'title': '图奇'},
    '30':  {'img_path':'','champId': '30', 'label': '死亡颂唱者', 'alias': 'Karthus', 'title': '卡尔萨斯'},
    '31':  {'img_path':'','champId': '31', 'label': '虚空恐惧', 'alias': 'Chogath', 'title': '科加斯'},
    '32':  {'img_path':'','champId': '32', 'label': '殇之木乃伊', 'alias': 'Amumu', 'title': '阿木木'},
    '33':  {'img_path':'','champId': '33', 'label': '披甲龙龟', 'alias': 'Rammus', 'title': '拉莫斯'},
    '34':  {'img_path':'','champId': '34', 'label': '冰晶凤凰', 'alias': 'Anivia', 'title': '艾尼维亚'},
    '35':  {'img_path':'','champId': '35', 'label': '恶魔小丑', 'alias': 'Shaco', 'title': '萨科'},
    '36':  {'img_path':'','champId': '36', 'label': '祖安狂人', 'alias': 'DrMundo', 'title': '蒙多医生'},
    '37':  {'img_path':'','champId': '37', 'label': '琴瑟仙女', 'alias': 'Sona', 'title': '娑娜'},
    '38':  {'img_path':'','champId': '38', 'label': '虚空行者', 'alias': 'Kassadin', 'title': '卡萨丁'},
    '39':  {'img_path':'','champId': '39', 'label': '刀锋舞者', 'alias': 'Irelia', 'title': '艾瑞莉娅'},
    '40':  {'img_path':'','champId': '40', 'label': '风暴之怒', 'alias': 'Janna', 'title': '迦娜'},
    '41':  {'img_path':'','champId': '41', 'label': '海洋之灾', 'alias': 'Gangplank', 'title': '普朗克'},
    '42':  {'img_path':'','champId': '42', 'label': '英勇投弹手', 'alias': 'Corki', 'title': '库奇'},
    '43':  {'img_path':'','champId': '43', 'label': '天启者', 'alias': 'Karma', 'title': '卡尔玛'},
    '44':  {'img_path':'','champId': '44', 'label': '瓦洛兰之盾', 'alias': 'Taric', 'title': '塔里克'},
    '45':  {'img_path':'','champId': '45', 'label': '邪恶小法师', 'alias': 'Veigar', 'title': '维迦'},
    '48':  {'img_path':'','champId': '48', 'label': '巨魔之王', 'alias': 'Trundle', 'title': '特朗德尔'},
    '50':  {'img_path':'','champId': '50', 'label': '诺克萨斯统领', 'alias': 'Swain', 'title': '斯维因'},
    '51':  {'img_path':'','champId': '51', 'label': '皮城女警', 'alias': 'Caitlyn', 'title': '凯特琳'},
    '53':  {'img_path':'','champId': '53', 'label': '蒸汽机器人', 'alias': 'Blitzcrank', 'title': '布里茨'},
    '54':  {'img_path':'','champId': '54', 'label': '熔岩巨兽', 'alias': 'Malphite', 'title': '墨菲特'},
    '55':  {'img_path':'','champId': '55', 'label': '不祥之刃', 'alias': 'Katarina', 'title': '卡特琳娜'},
    '56':  {'img_path':'','champId': '56', 'label': '永恒梦魇', 'alias': 'Nocturne', 'title': '魔腾'},
    '57':  {'img_path':'','champId': '57', 'label': '扭曲树精', 'alias': 'Maokai', 'title': '茂凯'},
    '58':  {'img_path':'','champId': '58', 'label': '荒漠屠夫', 'alias': 'Renekton', 'title': '雷克顿'},
    '59':  {'img_path':'','champId': '59', 'label': '德玛西亚皇子', 'alias': 'JarvanIV', 'title': '嘉文四世'},
    '60':  {'img_path':'','champId': '60', 'label': '蜘蛛女皇', 'alias': 'Elise', 'title': '伊莉丝'},
    '61':  {'img_path':'','champId': '61', 'label': '发条魔灵', 'alias': 'Orianna', 'title': '奥莉安娜'},
    '62':  {'img_path':'','champId': '62', 'label': '齐天大圣', 'alias': 'MonkeyKing', 'title': '孙悟空'},
    '63':  {'img_path':'','champId': '63', 'label': '复仇焰魂', 'alias': 'Brand', 'title': '布兰德'},
    '64':  {'img_path':'','champId': '64', 'label': '盲僧', 'alias': 'LeeSin', 'title': '李青'},
    '67':  {'img_path':'','champId': '67', 'label': '暗夜猎手', 'alias': 'Vayne', 'title': '薇恩'},
    '68':  {'img_path':'','champId': '68', 'label': '机械公敌', 'alias': 'Rumble', 'title': '兰博'},
    '69':  {'img_path':'','champId': '69', 'label': '魔蛇之拥', 'alias': 'Cassiopeia', 'title': '卡西奥佩娅'},
    '72':  {'img_path':'','champId': '72', 'label': '水晶先锋', 'alias': 'Skarner', 'title': '斯卡纳'},
    '74':  {'img_path':'','champId': '74', 'label': '大发明家', 'alias': 'Heimerdinger', 'title': '黑默丁格'},
    '75':  {'img_path':'','champId': '75', 'label': '沙漠死神', 'alias': 'Nasus', 'title': '内瑟斯'},
    '76':  {'img_path':'','champId': '76', 'label': '狂野女猎手', 'alias': 'Nidalee', 'title': '奈德丽'},
    '77':  {'img_path':'','champId': '77', 'label': '兽灵行者', 'alias': 'Udyr', 'title': '乌迪尔'},
    '78':  {'img_path':'','champId': '78', 'label': '圣锤之毅', 'alias': 'Poppy', 'title': '波比'},
    '79':  {'img_path':'','champId': '79', 'label': '酒桶', 'alias': 'Gragas', 'title': '古拉加斯'},
    '80':  {'img_path':'','champId': '80', 'label': '不屈之枪', 'alias': 'Pantheon', 'title': '潘森'},
    '81':  {'img_path':'','champId': '81', 'label': '探险家', 'alias': 'Ezreal', 'title': '伊泽瑞尔'},
    '82':  {'img_path':'','champId': '82', 'label': '铁铠冥魂', 'alias': 'Mordekaiser', 'title': '莫德凯撒'},
    '83':  {'img_path':'','champId': '83', 'label': '牧魂人', 'alias': 'Yorick', 'title': '约里克'},
    '84':  {'img_path':'','champId': '84', 'label': '离群之刺', 'alias': 'Akali', 'title': '阿卡丽'},
    '85':  {'img_path':'','champId': '85', 'label': '狂暴之心', 'alias': 'Kennen', 'title': '凯南'},
    '86':  {'img_path':'','champId': '86', 'label': '德玛西亚之力', 'alias': 'Garen', 'title': '盖伦'},
    '89':  {'img_path':'','champId': '89', 'label': '曙光女神', 'alias': 'Leona', 'title': '蕾欧娜'},
    '90':  {'img_path':'','champId': '90', 'label': '虚空先知', 'alias': 'Malzahar', 'title': '玛尔扎哈'},
    '91':  {'img_path':'','champId': '91', 'label': '刀锋之影', 'alias': 'Talon', 'title': '泰隆'},
    '92':  {'img_path':'','champId': '92', 'label': '放逐之刃', 'alias': 'Riven', 'title': '锐雯'},
    '96':  {'img_path':'','champId': '96', 'label': '深渊巨口', 'alias': 'KogMaw', 'title': '克格莫'},
    '98':  {'img_path':'','champId': '98', 'label': '暮光之眼', 'alias': 'Shen', 'title': '慎'},
    '99':  {'img_path':'','champId': '99', 'label': '光辉女郎', 'alias': 'Lux', 'title': '拉克丝'},
    '101':  {'img_path':'','champId': '101', 'label': '远古巫灵', 'alias': 'Xerath', 'title': '泽拉斯'},
    '102':  {'img_path':'','champId': '102', 'label': '龙血武姬', 'alias': 'Shyvana', 'title': '希瓦娜'},
    '103':  {'img_path':'','champId': '103', 'label': '九尾妖狐', 'alias': 'Ahri', 'title': '阿狸'},
    '104':  {'img_path':'','champId': '104', 'label': '法外狂徒', 'alias': 'Graves', 'title': '格雷福斯'},
    '105':  {'img_path':'','champId': '105', 'label': '潮汐海灵', 'alias': 'Fizz', 'title': '菲兹'},
    '106':  {'img_path':'','champId': '106', 'label': '不灭狂雷', 'alias': 'Volibear', 'title': '沃利贝尔'},
    '107':  {'img_path':'','champId': '107', 'label': '傲之追猎者', 'alias': 'Rengar', 'title': '雷恩加尔'},
    '110':  {'img_path':'','champId': '110', 'label': '惩戒之箭', 'alias': 'Varus', 'title': '韦鲁斯'},
    '111':  {'img_path':'','champId': '111', 'label': '深海泰坦', 'alias': 'Nautilus', 'title': '诺提勒斯'},
    '112':  {'img_path':'','champId': '112', 'label': '机械先驱', 'alias': 'Viktor', 'title': '维克托'},
    '113':  {'img_path':'','champId': '113', 'label': '北地之怒', 'alias': 'Sejuani', 'title': '瑟庄妮'},
    '114':  {'img_path':'','champId': '114', 'label': '无双剑姬', 'alias': 'Fiora', 'title': '菲奥娜'},
    '115':  {'img_path':'','champId': '115', 'label': '爆破鬼才', 'alias': 'Ziggs', 'title': '吉格斯'},
    '117':  {'img_path':'','champId': '117', 'label': '仙灵女巫', 'alias': 'Lulu', 'title': '璐璐'},
    '119':  {'img_path':'','champId': '119', 'label': '荣耀行刑官', 'alias': 'Draven', 'title': '德莱文'},
    '120':  {'img_path':'','champId': '120', 'label': '战争之影', 'alias': 'Hecarim', 'title': '赫卡里姆'},
    '121':  {'img_path':'','champId': '121', 'label': '虚空掠夺者', 'alias': 'Khazix', 'title': '卡兹克'},
    '122':  {'img_path':'','champId': '122', 'label': '诺克萨斯之手', 'alias': 'Darius', 'title': '德莱厄斯'},
    '126':  {'img_path':'','champId': '126', 'label': '未来守护者', 'alias': 'Jayce', 'title': '杰斯'},
    '127':  {'img_path':'','champId': '127', 'label': '冰霜女巫', 'alias': 'Lissandra', 'title': '丽桑卓'},
    '131':  {'img_path':'','champId': '131', 'label': '皎月女神', 'alias': 'Diana', 'title': '黛安娜'},
    '133':  {'img_path':'','champId': '133', 'label': '德玛西亚之翼', 'alias': 'Quinn', 'title': '奎因'},
    '134':  {'img_path':'','champId': '134', 'label': '暗黑元首', 'alias': 'Syndra', 'title': '辛德拉'},
    '136':  {'img_path':'','champId': '136', 'label': '铸星龙王', 'alias': 'AurelionSol', 'title': '奥瑞利安索尔'},
    '141':  {'img_path':'','champId': '141', 'label': '影流之镰', 'alias': 'Kayn', 'title': '凯隐'},
    '142':  {'img_path':'','champId': '142', 'label': '暮光星灵', 'alias': 'Zoe', 'title': '佐伊'},
    '143':  {'img_path':'','champId': '143', 'label': '荆棘之兴', 'alias': 'Zyra', 'title': '婕拉'},
    '145':  {'img_path':'','champId': '145', 'label': '虚空之女', 'alias': 'Kaisa', 'title': '卡莎'},
    '147':  {'img_path':'','champId': '147', 'label': '星籁歌姬', 'alias': 'Seraphine', 'title': '萨勒芬妮'},
    '150':  {'img_path':'','champId': '150', 'label': '迷失之牙', 'alias': 'Gnar', 'title': '纳尔'},
    '154':  {'img_path':'','champId': '154', 'label': '生化魔人', 'alias': 'Zac', 'title': '扎克'},
    '157':  {'img_path':'','champId': '157', 'label': '疾风剑豪', 'alias': 'Yasuo', 'title': '亚索'},
    '161':  {'img_path':'','champId': '161', 'label': '虚空之眼', 'alias': 'Velkoz', 'title': '维克兹'},
    '163':  {'img_path':'','champId': '163', 'label': '岩雀', 'alias': 'Taliyah', 'title': '塔莉垭'},
    '164':  {'img_path':'','champId': '164', 'label': '青钢影', 'alias': 'Camille', 'title': '卡蜜尔'},
    '166':  {'img_path':'','champId': '166', 'label': '影哨', 'alias': 'Akshan', 'title': '阿克尚'},
    '200':  {'img_path':'','champId': '200', 'label': '虚空女皇', 'alias': 'Belveth', 'title': '卑尔维斯'},
    '201':  {'img_path':'','champId': '201', 'label': '弗雷尔卓德之心', 'alias': 'Braum', 'title': '布隆'},
    '202':  {'img_path':'','champId': '202', 'label': '戏命师', 'alias': 'Jhin', 'title': '烬'},
    '203':  {'img_path':'','champId': '203', 'label': '永猎双子', 'alias': 'Kindred', 'title': '千珏'},
    '221':  {'img_path':'','champId': '221', 'label': '祖安花火', 'alias': 'Zeri', 'title': '泽丽'},
    '222':  {'img_path':'','champId': '222', 'label': '暴走萝莉', 'alias': 'Jinx', 'title': '金克丝'},
    '223':  {'img_path':'','champId': '223', 'label': '河流之王', 'alias': 'TahmKench', 'title': '塔姆'},
    '234':  {'img_path':'','champId': '234', 'label': '破败之王', 'alias': 'Viego', 'title': '佛耶戈'},
    '235':  {'img_path':'','champId': '235', 'label': '涤魂圣枪', 'alias': 'Senna', 'title': '赛娜'},
    '236':  {'img_path':'','champId': '236', 'label': '圣枪游侠', 'alias': 'Lucian', 'title': '卢锡安'},
    '238':  {'img_path':'','champId': '238', 'label': '影流之主', 'alias': 'Zed', 'title': '劫'},
    '240':  {'img_path':'','champId': '240', 'label': '暴怒骑士', 'alias': 'Kled', 'title': '克烈'},
    '245':  {'img_path':'','champId': '245', 'label': '时间刺客', 'alias': 'Ekko', 'title': '艾克'},
    '246':  {'img_path':'','champId': '246', 'label': '元素女皇', 'alias': 'Qiyana', 'title': '奇亚娜'},
    '254':  {'img_path':'','champId': '254', 'label': '皮城执法官', 'alias': 'Vi', 'title': '蔚'},
    '266':  {'img_path':'','champId': '266', 'label': '暗裔剑魔', 'alias': 'Aatrox', 'title': '亚托克斯'},
    '267':  {'img_path':'','champId': '267', 'label': '唤潮鲛姬', 'alias': 'Nami', 'title': '娜美'},
    '268':  {'img_path':'','champId': '268', 'label': '沙漠皇帝', 'alias': 'Azir', 'title': '阿兹尔'},
    '350':  {'img_path':'','champId': '350', 'label': '魔法猫咪', 'alias': 'Yuumi', 'title': '悠米'},
    '360':  {'img_path':'','champId': '360', 'label': '沙漠玫瑰', 'alias': 'Samira', 'title': '莎弥拉'},
    '412':  {'img_path':'','champId': '412', 'label': '魂锁典狱长', 'alias': 'Thresh', 'title': '锤石'},
    '420':  {'img_path':'','champId': '420', 'label': '海兽祭司', 'alias': 'Illaoi', 'title': '俄洛伊'},
    '421':  {'img_path':'','champId': '421', 'label': '虚空遁地兽', 'alias': 'RekSai', 'title': '雷克塞'},
    '427':  {'img_path':'','champId': '427', 'label': '翠神', 'alias': 'Ivern', 'title': '艾翁'},
    '429':  {'img_path':'','champId': '429', 'label': '复仇之矛', 'alias': 'Kalista', 'title': '卡莉丝塔'},
    '432':  {'img_path':'','champId': '432', 'label': '星界游神', 'alias': 'Bard', 'title': '巴德'},
    '497':  {'img_path':'','champId': '497', 'label': '幻翎', 'alias': 'Rakan', 'title': '洛'},
    '498':  {'img_path':'','champId': '498', 'label': '逆羽', 'alias': 'Xayah', 'title': '霞'},
    '516':  {'img_path':'','champId': '516', 'label': '山隐之焰', 'alias': 'Ornn', 'title': '奥恩'},
    '517':  {'img_path':'','champId': '517', 'label': '解脱者', 'alias': 'Sylas', 'title': '塞拉斯'},
    '518':  {'img_path':'','champId': '518', 'label': '万花通灵', 'alias': 'Neeko', 'title': '妮蔻'},
    '523':  {'img_path':'','champId': '523', 'label': '残月之肃', 'alias': 'Aphelios', 'title': '厄斐琉斯'},
    '526':  {'img_path':'','champId': '526', 'label': '镕铁少女', 'alias': 'Rell', 'title': '芮尔'},
    '555':  {'img_path':'','champId': '555', 'label': '血港鬼影', 'alias': 'Pyke', 'title': '派克'},
    '711':  {'img_path':'','champId': '711', 'label': '愁云使者', 'alias': 'Vex', 'title': '薇古丝'},
    '777':  {'img_path':'','champId': '777', 'label': '封魔剑魂', 'alias': 'Yone', 'title': '永恩'},
    '875':  {'img_path':'','champId': '875', 'label': '腕豪', 'alias': 'Sett', 'title': '瑟提'},
    '876':  {'img_path':'','champId': '876', 'label': '含羞蓓蕾', 'alias': 'Lillia', 'title': '莉莉娅'},
    '887':  {'img_path':'','champId': '887', 'label': '灵罗娃娃', 'alias': 'Gwen', 'title': '格温'},
    '888':  {'img_path':'','champId': '888', 'label': '炼金男爵', 'alias': 'Renata', 'title': '烈娜塔 · 戈拉斯克'},
    '895':  {'img_path':'','champId': '895', 'label': '不羁之悦', 'alias': 'Nilah', 'title': '尼菈'},
    '897':  {'img_path':'','champId': '897', 'label': '纳祖芒荣耀', 'alias': 'KSante', 'title': '奎桑提'},
    '902':  {'img_path':'','champId': '902', 'label': '明烛', 'alias': 'Milio', 'title': '米利欧'},
    '950':  {'img_path':'','champId': '950', 'label': '百裂冥犬', 'alias': 'Naafiri', 'title': '纳亚菲利'},
    '233':  {'img_path':'','champId': '233', 'label': '狂厄蔷薇', 'alias': 'Briar', 'title': '贝蕾亚'},
    '910':  {'img_path':'','champId': '910', 'label': '异画师', 'alias': 'Hwei', 'title': '彗'},
    '901':  {'img_path':'','champId': '901', 'label': '炽焰雏龙', 'alias': 'Smolder', 'title': '斯莫德'},
  }

export var optionsChampion = [
  {
    'value': '1',
    'label': '黑暗之女'
  }, {
    'value': '2',
    'label': '狂战士'
  }, {
    'value': '3',
    'label': '正义巨像'
  }, {
    'value': '4',
    'label': '卡牌大师'
  }, {
    'value': '5',
    'label': '德邦总管'
  }, {
    'value': '6',
    'label': '无畏战车'
  }, {
    'value': '7',
    'label': '诡术妖姬'
  }, {
    'value': '8',
    'label': '猩红收割者'
  }, {
    'value': '9',
    'label': '远古恐惧'
  }, {
    'value': '10',
    'label': '正义天使'
  }, {
    'value': '11',
    'label': '无极剑圣'
  }, {
    'value': '12',
    'label': '牛头酋长'
  }, {
    'value': '13',
    'label': '符文法师'
  }, {
    'value': '14',
    'label': '亡灵战神'
  }, {
    'value': '15',
    'label': '战争女神'
  }, {
    'value': '16',
    'label': '众星之子'
  }, {
    'value': '17',
    'label': '迅捷斥候'
  }, {
    'value': '18',
    'label': '麦林炮手'
  }, {
    'value': '19',
    'label': '祖安怒兽'
  }, {
    'value': '20',
    'label': '雪原双子'
  }, {
    'value': '21',
    'label': '赏金猎人'
  }, {
    'value': '22',
    'label': '寒冰射手'
  }, {
    'value': '23',
    'label': '蛮族之王'
  }, {
    'value': '24',
    'label': '武器大师'
  }, {
    'value': '25',
    'label': '堕落天使'
  }, {
    'value': '26',
    'label': '时光守护者'
  }, {
    'value': '27',
    'label': '炼金术士'
  }, {
    'value': '28',
    'label': '痛苦之拥'
  }, {
    'value': '29',
    'label': '瘟疫之源'
  }, {
    'value': '30',
    'label': '死亡颂唱者'
  }, {
    'value': '31',
    'label': '虚空恐惧'
  }, {
    'value': '32',
    'label': '殇之木乃伊'
  }, {
    'value': '33',
    'label': '披甲龙龟'
  }, {
    'value': '34',
    'label': '冰晶凤凰'
  }, {
    'value': '35',
    'label': '恶魔小丑'
  }, {
    'value': '36',
    'label': '祖安狂人'
  }, {
    'value': '37',
    'label': '琴瑟仙女'
  }, {
    'value': '38',
    'label': '虚空行者'
  }, {
    'value': '39',
    'label': '刀锋舞者'
  }, {
    'value': '40',
    'label': '风暴之怒'
  }, {
    'value': '41',
    'label': '海洋之灾'
  }, {
    'value': '42',
    'label': '英勇投弹手'
  }, {
    'value': '43',
    'label': '天启者'
  }, {
    'value': '44',
    'label': '瓦洛兰之盾'
  }, {
    'value': '45',
    'label': '邪恶小法师'
  }, {
    'value': '48',
    'label': '巨魔之王'
  }, {
    'value': '50',
    'label': '诺克萨斯统领'
  }, {
    'value': '51',
    'label': '皮城女警'
  }, {
    'value': '53',
    'label': '蒸汽机器人'
  }, {
    'value': '54',
    'label': '熔岩巨兽'
  }, {
    'value': '55',
    'label': '不祥之刃'
  }, {
    'value': '56',
    'label': '永恒梦魇'
  }, {
    'value': '57',
    'label': '扭曲树精'
  }, {
    'value': '58',
    'label': '荒漠屠夫'
  }, {
    'value': '59',
    'label': '德玛西亚皇子'
  }, {
    'value': '60',
    'label': '蜘蛛女皇'
  }, {
    'value': '61',
    'label': '发条魔灵'
  }, {
    'value': '62',
    'label': '齐天大圣'
  }, {
    'value': '63',
    'label': '复仇焰魂'
  }, {
    'value': '64',
    'label': '盲僧'
  }, {
    'value': '67',
    'label': '暗夜猎手'
  }, {
    'value': '68',
    'label': '机械公敌'
  }, {
    'value': '69',
    'label': '魔蛇之拥'
  }, {
    'value': '72',
    'label': '水晶先锋'
  }, {
    'value': '74',
    'label': '大发明家'
  }, {
    'value': '75',
    'label': '沙漠死神'
  }, {
    'value': '76',
    'label': '狂野女猎手'
  }, {
    'value': '77',
    'label': '兽灵行者'
  }, {
    'value': '78',
    'label': '圣锤之毅'
  }, {
    'value': '79',
    'label': '酒桶'
  }, {
    'value': '80',
    'label': '不屈之枪'
  }, {
    'value': '81',
    'label': '探险家'
  }, {
    'value': '82',
    'label': '铁铠冥魂'
  }, {
    'value': '83',
    'label': '牧魂人'
  }, {
    'value': '84',
    'label': '离群之刺'
  }, {
    'value': '85',
    'label': '狂暴之心'
  }, {
    'value': '86',
    'label': '德玛西亚之力'
  }, {
    'value': '89',
    'label': '曙光女神'
  }, {
    'value': '90',
    'label': '虚空先知'
  }, {
    'value': '91',
    'label': '刀锋之影'
  }, {
    'value': '92',
    'label': '放逐之刃'
  }, {
    'value': '96',
    'label': '深渊巨口'
  }, {
    'value': '98',
    'label': '暮光之眼'
  }, {
    'value': '99',
    'label': '光辉女郎'
  }, {
    'value': '101',
    'label': '远古巫灵'
  }, {
    'value': '102',
    'label': '龙血武姬'
  }, {
    'value': '103',
    'label': '九尾妖狐'
  }, {
    'value': '104',
    'label': '法外狂徒'
  }, {
    'value': '105',
    'label': '潮汐海灵'
  }, {
    'value': '106',
    'label': '不灭狂雷'
  }, {
    'value': '107',
    'label': '傲之追猎者'
  }, {
    'value': '110',
    'label': '惩戒之箭'
  }, {
    'value': '111',
    'label': '深海泰坦'
  }, {
    'value': '112',
    'label': '机械先驱'
  }, {
    'value': '113',
    'label': '北地之怒'
  }, {
    'value': '114',
    'label': '无双剑姬'
  }, {
    'value': '115',
    'label': '爆破鬼才'
  }, {
    'value': '117',
    'label': '仙灵女巫'
  }, {
    'value': '119',
    'label': '荣耀行刑官'
  }, {
    'value': '120',
    'label': '战争之影'
  }, {
    'value': '121',
    'label': '虚空掠夺者'
  }, {
    'value': '122',
    'label': '诺克萨斯之手'
  }, {
    'value': '126',
    'label': '未来守护者'
  }, {
    'value': '127',
    'label': '冰霜女巫'
  }, {
    'value': '131',
    'label': '皎月女神'
  }, {
    'value': '133',
    'label': '德玛西亚之翼'
  }, {
    'value': '134',
    'label': '暗黑元首'
  }, {
    'value': '136',
    'label': '铸星龙王'
  }, {
    'value': '141',
    'label': '影流之镰'
  }, {
    'value': '142',
    'label': '暮光星灵'
  }, {
    'value': '143',
    'label': '荆棘之兴'
  }, {
    'value': '145',
    'label': '虚空之女'
  }, {
    'value': '147',
    'label': '星籁歌姬'
  }, {
    'value': '150',
    'label': '迷失之牙'
  }, {
    'value': '154',
    'label': '生化魔人'
  }, {
    'value': '157',
    'label': '疾风剑豪'
  }, {
    'value': '161',
    'label': '虚空之眼'
  }, {
    'value': '163',
    'label': '岩雀'
  }, {
    'value': '164',
    'label': '青钢影'
  }, {
    'value': '166',
    'label': '影哨'
  }, {
    'value': '200',
    'label': '虚空女皇'
  }, {
    'value': '201',
    'label': '弗雷尔卓德之心'
  }, {
    'value': '202',
    'label': '戏命师'
  }, {
    'value': '203',
    'label': '永猎双子'
  }, {
    'value': '221',
    'label': '祖安花火'
  }, {
    'value': '222',
    'label': '暴走萝莉'
  }, {
    'value': '223',
    'label': '河流之王'
  }, {
    'value': '234',
    'label': '破败之王'
  }, {
    'value': '235',
    'label': '涤魂圣枪'
  }, {
    'value': '236',
    'label': '圣枪游侠'
  }, {
    'value': '238',
    'label': '影流之主'
  }, {
    'value': '240',
    'label': '暴怒骑士'
  }, {
    'value': '245',
    'label': '时间刺客'
  }, {
    'value': '246',
    'label': '元素女皇'
  }, {
    'value': '254',
    'label': '皮城执法官'
  }, {
    'value': '266',
    'label': '暗裔剑魔'
  }, {
    'value': '267',
    'label': '唤潮鲛姬'
  }, {
    'value': '268',
    'label': '沙漠皇帝'
  }, {
    'value': '350',
    'label': '魔法猫咪'
  }, {
    'value': '360',
    'label': '沙漠玫瑰'
  }, {
    'value': '412',
    'label': '魂锁典狱长'
  }, {
    'value': '420',
    'label': '海兽祭司'
  }, {
    'value': '421',
    'label': '虚空遁地兽'
  }, {
    'value': '427',
    'label': '翠神'
  }, {
    'value': '429',
    'label': '复仇之矛'
  }, {
    'value': '432',
    'label': '星界游神'
  }, {
    'value': '497',
    'label': '幻翎'
  }, {
    'value': '498',
    'label': '逆羽'
  }, {
    'value': '516',
    'label': '山隐之焰'
  }, {
    'value': '517',
    'label': '解脱者'
  }, {
    'value': '518',
    'label': '万花通灵'
  }, {
    'value': '523',
    'label': '残月之肃'
  }, {
    'value': '526',
    'label': '镕铁少女'
  }, {
    'value': '555',
    'label': '血港鬼影'
  }, {
    'value': '711',
    'label': '愁云使者'
  }, {
    'value': '777',
    'label': '封魔剑魂'
  }, {
    'value': '875',
    'label': '腕豪'
  }, {
    'value': '876',
    'label': '含羞蓓蕾'
  }, {
    'value': '887',
    'label': '灵罗娃娃'
  }, {
    'value': '888',
    'label': '炼金男爵'
  },
  {
    'value': '895',
    'label': '不羁之悦'
  },
  {
    'value': '897',
    'label': '纳祖芒荣耀'
  },
  {
    'value': '902',
    'label': '明烛'
  },
  {
    'value': '950',
    'label': '百裂冥犬'
  },
  {
    'value': '233',
    'label': '狂厄蔷薇'
  },
  {
    'value': '910',
    'label': '异画师'
  },{
    'value': '901',
    'label': '炽焰雏龙'
  }
]
export var mapNameFromUrl: { [key: string]: { label: string, name: string } } = {
  'Annie': {'label': '黑暗之女', 'name': '安妮'},
  'Olaf': {'label': '狂战士', 'name': '奥拉夫'},
  'Galio': {'label': '正义巨像', 'name': '加里奥'},
  'TwistedFate': {'label': '卡牌大师', 'name': '崔斯特'},
  'XinZhao': {'label': '德邦总管', 'name': '赵信'},
  'Urgot': {'label': '无畏战车', 'name': '厄加特'},
  'Leblanc': {'label': '诡术妖姬', 'name': '乐芙兰'},
  'Vladimir': {'label': '猩红收割者', 'name': '弗拉基米尔'},
  'FiddleSticks': {'label': '远古恐惧', 'name': '费德提克'},
  'Fiddlesticks': {'label': '远古恐惧', 'name': '费德提克'},
  'Kayle': {'label': '正义天使', 'name': '凯尔'},
  'MasterYi': {'label': '无极剑圣', 'name': '易'},
  'Alistar': {'label': '牛头酋长', 'name': '阿利斯塔'},
  'Ryze': {'label': '符文法师', 'name': '瑞兹'},
  'Sion': {'label': '亡灵战神', 'name': '赛恩'},
  'Sivir': {'label': '战争女神', 'name': '希维尔'},
  'Soraka': {'label': '众星之子', 'name': '索拉卡'},
  'Teemo': {'label': '迅捷斥候', 'name': '提莫'},
  'Tristana': {'label': '麦林炮手', 'name': '崔丝塔娜'},
  'Warwick': {'label': '祖安怒兽', 'name': '沃里克'},
  'Nunu': {'label': '雪原双子', 'name': '努努和威朗普'},
  'MissFortune': {'label': '赏金猎人', 'name': '厄运小姐'},
  'Ashe': {'label': '寒冰射手', 'name': '艾希'},
  'Tryndamere': {'label': '蛮族之王', 'name': '泰达米尔'},
  'Jax': {'label': '武器大师', 'name': '贾克斯'},
  'Morgana': {'label': '堕落天使', 'name': '莫甘娜'},
  'Zilean': {'label': '时光守护者', 'name': '基兰'},
  'Singed': {'label': '炼金术士', 'name': '辛吉德'},
  'Evelynn': {'label': '痛苦之拥', 'name': '伊芙琳'},
  'Twitch': {'label': '瘟疫之源', 'name': '图奇'},
  'Karthus': {'label': '死亡颂唱者', 'name': '卡尔萨斯'},
  'Chogath': {'label': '虚空恐惧', 'name': '科加斯'},
  'Amumu': {'label': '殇之木乃伊', 'name': '阿木木'},
  'Rammus': {'label': '披甲龙龟', 'name': '拉莫斯'},
  'Anivia': {'label': '冰晶凤凰', 'name': '艾尼维亚'},
  'Shaco': {'label': '恶魔小丑', 'name': '萨科'},
  'DrMundo': {'label': '祖安狂人', 'name': '蒙多医生'},
  'Sona': {'label': '琴瑟仙女', 'name': '娑娜'},
  'Kassadin': {'label': '虚空行者', 'name': '卡萨丁'},
  'Irelia': {'label': '刀锋舞者', 'name': '艾瑞莉娅'},
  'Janna': {'label': '风暴之怒', 'name': '迦娜'},
  'Gangplank': {'label': '海洋之灾', 'name': '普朗克'},
  'Corki': {'label': '英勇投弹手', 'name': '库奇'},
  'Karma': {'label': '天启者', 'name': '卡尔玛'},
  'Taric': {'label': '瓦洛兰之盾', 'name': '塔里克'},
  'Veigar': {'label': '邪恶小法师', 'name': '维迦'},
  'Trundle': {'label': '巨魔之王', 'name': '特朗德尔'},
  'Swain': {'label': '诺克萨斯统领', 'name': '斯维因'},
  'Caitlyn': {'label': '皮城女警', 'name': '凯特琳'},
  'Blitzcrank': {'label': '蒸汽机器人', 'name': '布里茨'},
  'Malphite': {'label': '熔岩巨兽', 'name': '墨菲特'},
  'Katarina': {'label': '不祥之刃', 'name': '卡特琳娜'},
  'Nocturne': {'label': '永恒梦魇', 'name': '魔腾'},
  'Maokai': {'label': '扭曲树精', 'name': '茂凯'},
  'Renekton': {'label': '荒漠屠夫', 'name': '雷克顿'},
  'JarvanIV': {'label': '德玛西亚皇子', 'name': '嘉文四世'},
  'Elise': {'label': '蜘蛛女皇', 'name': '伊莉丝'},
  'Orianna': {'label': '发条魔灵', 'name': '奥莉安娜'},
  'MonkeyKing': {'label': '齐天大圣', 'name': '孙悟空'},
  'Brand': {'label': '复仇焰魂', 'name': '布兰德'},
  'LeeSin': {'label': '盲僧', 'name': '李青'},
  'Vayne': {'label': '暗夜猎手', 'name': '薇恩'},
  'Rumble': {'label': '机械公敌', 'name': '兰博'},
  'Cassiopeia': {'label': '魔蛇之拥', 'name': '卡西奥佩娅'},
  'Skarner': {'label': '水晶先锋', 'name': '斯卡纳'},
  'Heimerdinger': {'label': '大发明家', 'name': '黑默丁格'},
  'Nasus': {'label': '沙漠死神', 'name': '内瑟斯'},
  'Nidalee': {'label': '狂野女猎手', 'name': '奈德丽'},
  'Udyr': {'label': '兽灵行者', 'name': '乌迪尔'},
  'Poppy': {'label': '圣锤之毅', 'name': '波比'},
  'Gragas': {'label': '酒桶', 'name': '古拉加斯'},
  'Pantheon': {'label': '不屈之枪', 'name': '潘森'},
  'Ezreal': {'label': '探险家', 'name': '伊泽瑞尔'},
  'Mordekaiser': {'label': '铁铠冥魂', 'name': '莫德凯撒'},
  'Yorick': {'label': '牧魂人', 'name': '约里克'},
  'Akali': {'label': '离群之刺', 'name': '阿卡丽'},
  'Kennen': {'label': '狂暴之心', 'name': '凯南'},
  'Garen': {'label': '德玛西亚之力', 'name': '盖伦'},
  'Leona': {'label': '曙光女神', 'name': '蕾欧娜'},
  'Malzahar': {'label': '虚空先知', 'name': '玛尔扎哈'},
  'Talon': {'label': '刀锋之影', 'name': '泰隆'},
  'Riven': {'label': '放逐之刃', 'name': '锐雯'},
  'KogMaw': {'label': '深渊巨口', 'name': '克格莫'},
  'Shen': {'label': '暮光之眼', 'name': '慎'},
  'Lux': {'label': '光辉女郎', 'name': '拉克丝'},
  'Xerath': {'label': '远古巫灵', 'name': '泽拉斯'},
  'Shyvana': {'label': '龙血武姬', 'name': '希瓦娜'},
  'Ahri': {'label': '九尾妖狐', 'name': '阿狸'},
  'Graves': {'label': '法外狂徒', 'name': '格雷福斯'},
  'Fizz': {'label': '潮汐海灵', 'name': '菲兹'},
  'Volibear': {'label': '不灭狂雷', 'name': '沃利贝尔'},
  'Rengar': {'label': '傲之追猎者', 'name': '雷恩加尔'},
  'Varus': {'label': '惩戒之箭', 'name': '韦鲁斯'},
  'Nautilus': {'label': '深海泰坦', 'name': '诺提勒斯'},
  'Viktor': {'label': '机械先驱', 'name': '维克托'},
  'Sejuani': {'label': '北地之怒', 'name': '瑟庄妮'},
  'Fiora': {'label': '无双剑姬', 'name': '菲奥娜'},
  'Ziggs': {'label': '爆破鬼才', 'name': '吉格斯'},
  'Lulu': {'label': '仙灵女巫', 'name': '璐璐'},
  'Draven': {'label': '荣耀行刑官', 'name': '德莱文'},
  'Hecarim': {'label': '战争之影', 'name': '赫卡里姆'},
  'Khazix': {'label': '虚空掠夺者', 'name': '卡兹克'},
  'Darius': {'label': '诺克萨斯之手', 'name': '德莱厄斯'},
  'Jayce': {'label': '未来守护者', 'name': '杰斯'},
  'Lissandra': {'label': '冰霜女巫', 'name': '丽桑卓'},
  'Diana': {'label': '皎月女神', 'name': '黛安娜'},
  'Quinn': {'label': '德玛西亚之翼', 'name': '奎因'},
  'Syndra': {'label': '暗黑元首', 'name': '辛德拉'},
  'AurelionSol': {'label': '铸星龙王', 'name': '奥瑞利安索尔'},
  'Kayn': {'label': '影流之镰', 'name': '凯隐'},
  'Zoe': {'label': '暮光星灵', 'name': '佐伊'},
  'Zyra': {'label': '荆棘之兴', 'name': '婕拉'},
  'Kaisa': {'label': '虚空之女', 'name': '卡莎'},
  'Seraphine': {'label': '星籁歌姬', 'name': '萨勒芬妮'},
  'Gnar': {'label': '迷失之牙', 'name': '纳尔'},
  'Zac': {'label': '生化魔人', 'name': '扎克'},
  'Yasuo': {'label': '疾风剑豪', 'name': '亚索'},
  'Velkoz': {'label': '虚空之眼', 'name': '维克兹'},
  'Taliyah': {'label': '岩雀', 'name': '塔莉垭'},
  'Camille': {'label': '青钢影', 'name': '卡蜜尔'},
  'Akshan': {'label': '影哨', 'name': '阿克尚'},
  'Belveth': {'label': '虚空女皇', 'name': '卑尔维斯'},
  'Braum': {'label': '弗雷尔卓德之心', 'name': '布隆'},
  'Jhin': {'label': '戏命师', 'name': '烬'},
  'Kindred': {'label': '永猎双子', 'name': '千珏'},
  'Zeri': {'label': '祖安花火', 'name': '泽丽'},
  'Jinx': {'label': '暴走萝莉', 'name': '金克丝'},
  'TahmKench': {'label': '河流之王', 'name': '塔姆'},
  'Viego': {'label': '破败之王', 'name': '佛耶戈'},
  'Senna': {'label': '涤魂圣枪', 'name': '赛娜'},
  'Lucian': {'label': '圣枪游侠', 'name': '卢锡安'},
  'Zed': {'label': '影流之主', 'name': '劫'},
  'Kled': {'label': '暴怒骑士', 'name': '克烈'},
  'Ekko': {'label': '时间刺客', 'name': '艾克'},
  'Qiyana': {'label': '元素女皇', 'name': '奇亚娜'},
  'Vi': {'label': '皮城执法官', 'name': '蔚'},
  'Aatrox': {'label': '暗裔剑魔', 'name': '亚托克斯'},
  'Nami': {'label': '唤潮鲛姬', 'name': '娜美'},
  'Azir': {'label': '沙漠皇帝', 'name': '阿兹尔'},
  'Yuumi': {'label': '魔法猫咪', 'name': '悠米'},
  'Samira': {'label': '沙漠玫瑰', 'name': '莎弥拉'},
  'Thresh': {'label': '魂锁典狱长', 'name': '锤石'},
  'Illaoi': {'label': '海兽祭司', 'name': '俄洛伊'},
  'RekSai': {'label': '虚空遁地兽', 'name': '雷克塞'},
  'Ivern': {'label': '翠神', 'name': '艾翁'},
  'Kalista': {'label': '复仇之矛', 'name': '卡莉丝塔'},
  'Bard': {'label': '星界游神', 'name': '巴德'},
  'Rakan': {'label': '幻翎', 'name': '洛'},
  'Xayah': {'label': '逆羽', 'name': '霞'},
  'Ornn': {'label': '山隐之焰', 'name': '奥恩'},
  'Sylas': {'label': '解脱者', 'name': '塞拉斯'},
  'Neeko': {'label': '万花通灵', 'name': '妮蔻'},
  'Aphelios': {'label': '残月之肃', 'name': '厄斐琉斯'},
  'Rell': {'label': '镕铁少女', 'name': '芮尔'},
  'Pyke': {'label': '血港鬼影', 'name': '派克'},
  'Vex': {'label': '愁云使者', 'name': '薇古丝'},
  'Yone': {'label': '封魔剑魂', 'name': '永恩'},
  'Sett': {'label': '腕豪', 'name': '瑟提'},
  'Lillia': {'label': '含羞蓓蕾', 'name': '莉莉娅'},
  'Gwen': {'label': '灵罗娃娃', 'name': '格温'},
  'Renata': {'label': '炼金男爵', 'name': '烈娜塔 · 戈拉斯克'},
  'Nilah': {'label': '不羁之悦', 'name': '尼菈'},
  'KSante': {'label': '纳祖芒荣耀', 'name': '奎桑提'},
  'Milio': {'label': '明烛', 'name': '米利欧'},
  'Naafiri': {'label': '百裂冥犬', 'name': '纳亚菲利'},
  'Briar': {'label': '狂厄蔷薇', 'name': '贝蕾亚'},
  'Hwei': {'label': '异画师', 'name': '彗'},
  'Smolder': {'label': '炽焰雏龙', 'name': '斯莫德'},
}
export var aliasToId: { [key: string]: number } = {
  "Annie": 1,
  "Olaf": 2,
  "Galio": 3,
  "TwistedFate": 4,
  "XinZhao": 5,
  "Urgot": 6,
  "Leblanc": 7,
  "Vladimir": 8,
  "Fiddlesticks": 9,
  "Kayle": 10,
  "MasterYi": 11,
  "Alistar": 12,
  "Ryze": 13,
  "Sion": 14,
  "Sivir": 15,
  "Soraka": 16,
  "Teemo": 17,
  "Tristana": 18,
  "Warwick": 19,
  "Nunu": 20,
  "MissFortune": 21,
  "Ashe": 22,
  "Tryndamere": 23,
  "Jax": 24,
  "Morgana": 25,
  "Zilean": 26,
  "Singed": 27,
  "Evelynn": 28,
  "Twitch": 29,
  "Karthus": 30,
  "Chogath": 31,
  "Amumu": 32,
  "Rammus": 33,
  "Anivia": 34,
  "Shaco": 35,
  "DrMundo": 36,
  "Sona": 37,
  "Kassadin": 38,
  "Irelia": 39,
  "Janna": 40,
  "Gangplank": 41,
  "Corki": 42,
  "Karma": 43,
  "Taric": 44,
  "Veigar": 45,
  "Trundle": 48,
  "Swain": 50,
  "Caitlyn": 51,
  "Blitzcrank": 53,
  "Malphite": 54,
  "Katarina": 55,
  "Nocturne": 56,
  "Maokai": 57,
  "Renekton": 58,
  "JarvanIV": 59,
  "Elise": 60,
  "Orianna": 61,
  "MonkeyKing": 62,
  "Brand": 63,
  "LeeSin": 64,
  "Vayne": 67,
  "Rumble": 68,
  "Cassiopeia": 69,
  "Skarner": 72,
  "Heimerdinger": 74,
  "Nasus": 75,
  "Nidalee": 76,
  "Udyr": 77,
  "Poppy": 78,
  "Gragas": 79,
  "Pantheon": 80,
  "Ezreal": 81,
  "Mordekaiser": 82,
  "Yorick": 83,
  "Akali": 84,
  "Kennen": 85,
  "Garen": 86,
  "Leona": 89,
  "Malzahar": 90,
  "Talon": 91,
  "Riven": 92,
  "KogMaw": 96,
  "Shen": 98,
  "Lux": 99,
  "Xerath": 101,
  "Shyvana": 102,
  "Ahri": 103,
  "Graves": 104,
  "Fizz": 105,
  "Volibear": 106,
  "Rengar": 107,
  "Varus": 110,
  "Nautilus": 111,
  "Viktor": 112,
  "Sejuani": 113,
  "Fiora": 114,
  "Ziggs": 115,
  "Lulu": 117,
  "Draven": 119,
  "Hecarim": 120,
  "Khazix": 121,
  "Darius": 122,
  "Jayce": 126,
  "Lissandra": 127,
  "Diana": 131,
  "Quinn": 133,
  "Syndra": 134,
  "AurelionSol": 136,
  "Kayn": 141,
  "Zoe": 142,
  "Zyra": 143,
  "Kaisa": 145,
  "Seraphine": 147,
  "Gnar": 150,
  "Zac": 154,
  "Yasuo": 157,
  "Velkoz": 161,
  "Taliyah": 163,
  "Camille": 164,
  "Akshan": 166,
  "Belveth": 200,
  "Braum": 201,
  "Jhin": 202,
  "Kindred": 203,
  "Zeri": 221,
  "Jinx": 222,
  "TahmKench": 223,
  "Viego": 234,
  "Senna": 235,
  "Lucian": 236,
  "Zed": 238,
  "Kled": 240,
  "Ekko": 245,
  "Qiyana": 246,
  "Vi": 254,
  "Aatrox": 266,
  "Nami": 267,
  "Azir": 268,
  "Yuumi": 350,
  "Samira": 360,
  "Thresh": 412,
  "Illaoi": 420,
  "RekSai": 421,
  "Ivern": 427,
  "Kalista": 429,
  "Bard": 432,
  "Rakan": 497,
  "Xayah": 498,
  "Ornn": 516,
  "Sylas": 517,
  "Neeko": 518,
  "Aphelios": 523,
  "Rell": 526,
  "Pyke": 555,
  "Vex": 711,
  "Yone": 777,
  "Sett": 875,
  "Lillia": 876,
  "Gwen": 887,
  "Renata": 888,
  "Nilah": 895,
  "KSante": 897,
  "Milio": 902,
  "Naafiri": 950,
  "Briar": 233,
  "Hwei": 910,
  'Smolder': 901,
}
var profileDic:{ [key: string]: { iconPath:string, iconBase64:string} } = {};
var itemsDic:{ [key: string]: { iconPath:string, iconBase64:string} } = {};
var spellsDic:{ [key: string]: { iconPath:string, iconBase64:string} } = {};
var perkDic:{ [key: string]: { iconPath:string, iconBase64:string} } = {};
export function get_perk_img(id:number):string {
  let p_ele = perkDic[String(id)];
  if (p_ele==undefined){
    return new URL("/src/assets/img/image.png", import.meta.url).href
  }else return p_ele.iconBase64;
}
export async function get_profile_img(id:number):Promise<string> {
  let pr_ele = profileDic[String(id)];
  if (pr_ele==undefined){
    return new URL("/src/assets/img/image.png", import.meta.url).href
  }else {
    return await get_img(pr_ele.iconPath);
  };
}
export function get_spell_img(id:number){
  let sp_ele = spellsDic[String(id)];
  if (sp_ele==undefined){
    return new URL("/src/assets/img/image.png", import.meta.url).href
  }else return sp_ele.iconBase64;
}
export function get_item_img(id:number){
  let it_ele = itemsDic[String(id)];
  if (it_ele==undefined){
    return new URL("/src/assets/img/image.png", import.meta.url).href
  }else return it_ele.iconBase64;
}
async function get_img(iconPath:string){
  const binaryData = new Uint8Array(await invoke('get_binary_res',{url:iconPath}));
  // 将 Uint8Array 转换为字符串
  const binaryString = binaryData.reduce((data, byte) => data + String.fromCharCode(byte), '');
  // 将字符串转换为 Base64 编码
  const base64String = btoa(binaryString);

  // 添加 Base64 编码头
  const base64Image = `data:image/png;base64,${base64String}`;
  return base64Image;
}
async function fill_img_dic(json_list:[],aim_dic:{ [key: string]: { iconPath:string, iconBase64:string} },fill_img=false) {
  for(let i=0;i<json_list.length;i++){
   
    let j_ele:any = json_list[i];
    if(j_ele.iconPath==undefined){
      continue;
    }
    let iconBase64 = '';
    if(fill_img) iconBase64 = await get_img(j_ele.iconPath);
    aim_dic[String(j_ele.id)]={iconPath:j_ele.iconPath,iconBase64:iconBase64};
  }
}
export async function refresh_all_champion(summonerId:string){
  champDict = {};
  optionsChampion =[];
  mapNameFromUrl = {};
  aliasToId = {};
  profileDic = {};
  itemsDic = {};
  spellsDic = {};
  perkDic = {};
  const championInfo:[] = await invoke('get_json_res',{url:`/lol-champions/v1/inventories/${summonerId}/champions`});
  const items:[] = await invoke('get_json_res',{url:`/lol-game-data/assets/v1/items.json`});
  const profile_icons:[] = await invoke('get_json_res',{url:`/lol-game-data/assets/v1/profile-icons.json`});
  const spells_icons:[] = await invoke('get_json_res',{url:`/lol-game-data/assets/v1/summoner-spells.json`});
  const perk_icons:[] = await invoke('get_json_res',{url:`/lol-game-data/assets/v1/perks.json`});
  fill_img_dic(items,itemsDic,true);
  fill_img_dic(perk_icons,perkDic,true);
  fill_img_dic(profile_icons,profileDic,false);
  fill_img_dic(spells_icons,spellsDic,true);
  for(let i=0;i<championInfo.length;i++){
    let champion_dic:any = championInfo[i];

    aliasToId[champion_dic.alias] = champion_dic.id;
    let img_path = champion_dic.squarePortraitPath;
    const binaryData = new Uint8Array(await invoke('get_binary_res',{url:img_path}));
    // 将 Uint8Array 转换为字符串
    const binaryString = binaryData.reduce((data, byte) => data + String.fromCharCode(byte), '');
    // 将字符串转换为 Base64 编码
    const base64String = btoa(binaryString);

    // 添加 Base64 编码头
    const base64Image = `data:image/png;base64,${base64String}`;
    mapNameFromUrl[champion_dic.alias] = {'label': champion_dic.name, 'name': champion_dic.title};
    optionsChampion.push({
      'value': String(champion_dic.id),
      'label': champion_dic.name
    });
    champDict[String(champion_dic.id)] = {'img_path':base64Image,'champId': String(champion_dic.id), 'label': champion_dic.name, 'alias': champion_dic.alias, 'title': champion_dic.title};


  }
}