import { Button, Input, Radio, Space, Table, Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { activityStatus } from './activityManage.config'
import { IActivity } from "./activityManage.type";
import useFetchList from "../../hooks/use-fetch-list";
import API from './../../api'

export default function ActivityManage () {
    const {dataSource,total} = useFetchList<IActivity>({
        API:API.getAct
    })
    // console.log('dataSource',dataSource);
    
    const getActivityStatusName = (text:string) => {
        switch(text){
            case '0':
                return '未开始'
                case '1':
                return '进行中'
                case '2':
                return '已结束'
        }
    }
    const columns:ColumnsType<IActivity> = [
        {
            title:"活动名称",
            dataIndex:'activityName',
            width:300
        },
        {
            title:"活动封面",
            dataIndex:'activityImg',
            width:100,
            render:(text) => {
                return <Image width={100} src={text}/>
            }
        },
        {
            title:"活动状态",
            dataIndex:'activityStatus',
            width:100,
            render:(text)=>{
                return getActivityStatusName(text)
            }
        },
        {
            title:"地址",
            dataIndex:'address',
            width:200
        },
        {
            title:"举办方",
            dataIndex:'business',
            width:200
        },
        {
            title:"操作",
            dataIndex:'business',
            width:200,
            render:() => {
                return (
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button danger>删除</Button>
                        <Button>查看报名人数</Button>
                    </Space>
                )
            }
        },
    ]
    const onChange = () =>{

    }
    return (
        <div>
            <Space>
                <Button>
                    刷新
                </Button>
                <Button type="primary">
                    新增
                </Button>
                <Button danger>
                    删除
                </Button>
                <Radio.Group onChange={onChange} defaultValue="a">
                    {
                        activityStatus.map((item,index) => (
                            <Radio.Button key={index} value={item.value}>
                                {item.label}
                            </Radio.Button>
                        ))
                    }
                </Radio.Group>
                <Input placeholder="请输入活动名称"></Input>
            </Space>
            <Table style={{marginTop:'20px'}} columns={columns} dataSource={dataSource}></Table>
        </div>
    )
}