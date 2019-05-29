import schema2component from "../../utils/schema2component";


const schema = {
    type: 'page',
    title: '我的小组',
    body: 'body...'
};

export default schema2component(schema);