import React from 'react'
import { Input } from 'antd'
const Inputant2 = () => {
  return (
    <div className=' mt-6 pt-2 flex flex-col gap-1 pb-4'>
    <div className=' flex justify-between center '>
        <p className=' text-xs'>Lorem ipsum dolor sit amet.</p>
    </div>
    <Input placeholder="Vamos amadurecer sua ideia" size="small" prefix={<img src="/XDZT.gif" alt="User" style={{ width: '20px', height: '20px' }} />} />
  </div>
  )
}

export default Inputant2
