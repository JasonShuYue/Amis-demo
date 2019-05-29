import schema2component from "../../utils/schema2component";


const schema = {
    type: 'page',
    title: '课程管理',
    className: 'courseMgt',
    body: [
        {
            "type": "crud",
            "defaultParams": {
                "perPage": 10
            },
            "api": "/api/sample",

            "filter": {
                title: "",
                controls: [
                    {
                        type: "text",
                        label: '课程',
                        name: "keywords",
                        placeholder: "课程ID / 名称 / 老师关键词",
                    },

                    {
                        type: "select",
                        label: "类型",
                        name: "free",
                        // inline: true,
                        options: [
                            {
                                label: '免费课',
                                value: true,
                            },
                            {
                                label: '付费课',
                                value: false,
                            },
                        ]
                    }

                    // {
                    //     type: "plain",
                    //     text: "这里的表单项可以配置多个"
                    // }
                ]
            },
            "columns": [
                // 序号
                {
                    name: "num",
                    label: "#",
                    width: 50,
                    type: "text",
                    toggled: true,
                },
                // 课程ID
                {
                    "name": "courseId",
                    "label": "课程ID",
                    "type": "text",
                    "sortable": true,
                },
                // 课程名称
                {
                    "name": "courseName",
                    "label": "课程名称",
                    "type": "text",
                    "sortable": true,
                },
                // 小组个数
                {
                    "name": "groupNum",
                    "label": "小组个数",
                    "type": "text",
                    "sortable": true,
                },
                // 类型
                {
                    "name": "free",
                    "label": "类型",
                    "type": "mapping",
                    "sortable": true,
                    "map": {
                        true: "免费课",
                        false: "付费课",
                    }
                },
                // 老师
                {
                    "name": "teacher",
                    "label": "老师",
                    "sortable": true,
                    "type": "text"
                },
                // 课时数
                {
                    "name": "classHours",
                    "label": "课时数",
                    "sortable": true,
                    "type": "text"
                },
                // 分组人数
                {
                    "name": "groupSize",
                    "label": "分组人数",
                    "sortable": true,
                    "type": "text"
                },
                // 开课时间
                {
                    "name": "startTime",
                    "label": "开课时间",
                    "sortable": true,
                    "type": "text"
                },
            ]

        },
    ]
};

export default schema2component(schema);