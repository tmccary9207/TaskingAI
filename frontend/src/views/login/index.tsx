import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import aiIcon from "../../assets/img/LOGO+TEXT.svg";
import Beta from "../../assets/img/CommunityTag.svg?react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './login.module.scss'
import { fetchLogin } from '@/axios/index'
import { useTranslation } from 'react-i18next';

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation();
    const onFinish = async (val: object) => {
        setLoading(true)
        try {
            const res = await fetchLogin(val)
            localStorage.setItem('token', res.data.token)
            await navigate('/project/home')
            toast.success(t('signinSuccessful'))
        } catch (error) {
            toast.error(error.response.data.error.message)
        }
        setLoading(false)
    }
    return (
        <>
            <div className={style.login}>
                <div className={style["ai-header"]}>
                    <img src={aiIcon} alt="social-icon"></img>
                    <Beta style={{ marginLeft: '12px' }} />
                </div>
                <div className={style["welcome-font"]}>{t('authWelcomeBack')}</div>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label={t('authUsernameLabel')}
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: t('authUsernameMissingMessage'),
                            },

                        ]}
                    >
                        <Input placeholder={t('authUsernamePlaceholder')} className={style["input-edit"]} />
                    </Form.Item>

                    <Form.Item
                        label={t('authPassword')}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t('authPasswordMessage'),
                            },
                        ]}
                    >
                        <Input placeholder={t('authEnterPassword')} type="password" className={style["input-edit"]} />
                    </Form.Item>
                    <div className={style.remember}>


                    </div>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className={style["submit-btn"]}
                            loading={loading}
                        >
                            {t('authSignIn')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>

    )
}
export default Login