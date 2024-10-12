import {ref} from "vue";

const scripts = ref([
    {
        id:1,
        name:'剧本未定',
        image: 'src/pictures/剧名未定.jpg',
        type:['中式', '还原','推理'],
        playersNumber: 6,
        players: '6人 3男3女',
        duration: '3-4',
        price: 40,
        description: '曲若终，戏将散。剧名未定，戏子无言。我心向朝阳，自逐日 而去。山无遮，海无拦，山河无名，草木无声。我目望悬月， 自待月而终。\n' +
            '终见得，日出东方，却落于西。'
    },
    {
        id:2,
        name:'山月叹',
        image:'src/pictures/山月叹.png',
        type:['变格', '情感', '古风'],
        playersNumber: 6,
        players: '6人 3男3女',
        duration: '3-4',
        price: 40,
        description: '大唐天宝年间，一记鼓声响破长安黎明，王朝的命运随着旭 日冉冉升起。君可见九天阊阖开宫殿，万国衣冠拜冕旒；君可 闻诗人绣囗吐锦绣，落笔气象化风雷！\n' +
            '若说盛唐如梦，梦何堪比盛唐！\n' +
            '彼时，民间盛行一种幻术，奇诡莫测，可使神仙索揽天上 月，落地须臾生瓜熟，梦游千里越镜湖……\n' +
            '“——施主，世间爱恨，需得界限分明，分割得干干净净才 好。若是恨里沾染了点爱，或是爱里又掺着些恨，那便是最 糟糕了。你注定自逐歧路，自讨苦吃。”\n' +
            '“——纵自讨苦吃，我甘之如饴。”'
    },
    {
        id:3,
        name:'聊斋异世录',
        image:'src/pictures/聊斋异世录.jpg',
        type:['古风', '情感', '玄幻', '变格'],
        playersNumber: 7,
        players: '7人',
        duration: '3-4',
        price: 40,
        description: '折子戏2022收官大作，古风情感极致体验。\n' +
            '在很久很久以前，蒲松龄先生成神，笔下《聊斋志异》成为 神器，成为了一方世界，进行书中故事的演变。\n' +
            '随着书中世界的演变和壮大，聊斋世界的管理者，也就是 《聊斋志异》的书灵出于某些目的，创立了聊斋学院，召集 了许多学生。\n' +
            '这些学生来路不明，不知名讳，没有记忆，只余下一些似是 而非的情绪和梦境。 “你改过故事吗？”\n' +
            '“你拨弄过命运的轨迹之弦吗？”\n' +
            '于一页纸上跋山涉水，与一个名字相见恨晚，于每颗心中关 隘深深。\n' +
            '我也曾如天边月，看尽天下不平事。\n' +
            '我也曾如池边莲，揽尽梦中星辰客。\n' +
            '我也曾如雪中花，开出雪地孤春色。\n' +
            '只是惊鸿不过春，灯火不过夜。\n' +
            '不甘、不愿，偏要问一句为何，驳一声不服。 “不要愚弄。” “不要愚弄他人。” “不要愚弄自己...”\n' +
            '是不甘心，是放不下，是为你——无论千千万万遍。'
    },
    {
        id:4,
        name:'搞钱2',
        image:'src/pictures/搞钱2.png',
        type:['架空', '欢乐', '机制', '还原'],
        playersNumber: 10,
        players: '10人',
        duration: '4',
        price: 35,
        description: '货真价实的，如假包换的，富可敌国的金氏集团，他来了！\n' +
            '\n' +
            '为了重振家乡，金氏集团掌门人——散财仙人老金，广撒英雄帖，征集搞钱高手。无论你是天上飞的龙还是地上爬的虫，只要能搞钱就是人才！\n' +
            '\n' +
            '老金将携一众搞钱高手，从零打造上市公司！\n' +
            '\n' +
            '谁，将踩着塑料姐妹、表面恋人的肩膀，站到人生的巅峰？\n' +
            '\n' +
            '谁，将在瞬息万变的全球商战中大获全胜？\n' +
            '\n' +
            '搞钱之路，永无止尽！'

    },
    {
        id:5,
        name:'归途七万里',
        image:'src/pictures/归途七万里.png',
        type:['情感','民国','立意', '本格'],
        playersNumber: 6,
        players: '6人 3男3女人',
        duration: '4',
        price: 70,
        description: '归途七万里，无论我们以后走向哪一条路，从此，我们同舟共济。\n' +
            '\n' +
            '同治十一年（1872年），大清国门被洋人的坚船利炮洞开，南海失守，北夷割据，列强虎视眈眈，中国最后一个封建王朝正在走向末路。\n' +
            '\n' +
            '而此时在大洋的彼岸…....\n' +
            '\n' +
            '“孩子，到这里这么久，你觉得这里怎么样？”\n' +
            '\n' +
            '“先生，其实我羡慕他们....….我羡慕他们可以毫无顾忌地，畅谈自己的想要；我羡慕这里有电话机，人们可以随时表达爱慕与思念；我羡慕这里的女孩，可以穿着球鞋肆意奔跑；我羡慕这里的同学，回家就可以得到母亲的亲吻和拥抱。在这里，我学了一个词——自由。”\n' +
            '\n' +
            '“孩子，自由的人，并不奔赴已有自由的地方，而是要在没有自由的地方，夺回自由。”\n' +
            '\n' +
            '“我知道的，先生，我准备好回家了。因为，我们是火种。”'

    },
]);

export default scripts;