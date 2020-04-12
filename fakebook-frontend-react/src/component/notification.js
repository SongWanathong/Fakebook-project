import React from 'react'
import { notification } from 'antd';
import { CheckCircleFilled,CloseCircleFilled} from '@ant-design/icons';



 const successLoginNotification = ()=>{
    notification.open({
        message: 'Login sucsec',
        description: 'enjoy with fakebook',
        icon: <CheckCircleFilled style={{ color: '#54b600' }} />
    })
}
 const failLoginNotification = (message)=>{
    notification.open({
        message: 'Login fail',
        description: message,
        icon: <CloseCircleFilled style={{ color: '#f10' }} />
    })
}

export {successLoginNotification,failLoginNotification}


  