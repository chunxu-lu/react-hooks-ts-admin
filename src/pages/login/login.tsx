import './login.scss'
import { Form, Input,Button, Card } from 'antd';
import { ILoginParams } from './login.type';
import API from './../../api'
import { useDispatch,useSelector } from 'dva'
import { IGlobalState } from '../../model/type';

export default function Login() {
    const dispatch = useDispatch()
    const globalState = useSelector<{global:IGlobalState},IGlobalState>(
        ({global}) => global
    )
    const login = async (values:ILoginParams) => {
        const data = await API.login(values)
        dispatch({
            type:'global/setUserInfo',
            payload:{
                ...data
            }
        })
    }
    return (
        <div id="login">
            <Card style={{width:'300px'}}>
                <h2 className='title'>活动管理平台</h2>
            <Form
                onFinish={login}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名！' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码！' }]}
                >
                    <Input.Password />
                </Form.Item>
                <div className='login-btn'>
                    <Button type='primary' htmlType='submit'>
                        登录
                    </Button>
                </div>
            </Form>
            </Card>
        </div>
    )
}