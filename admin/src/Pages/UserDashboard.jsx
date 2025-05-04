import React from 'react'

const Login = () => {
    const [userData, setUserData] = userState({
        name: 'Edward Vincent',
        email: 'richardjames@gmail.com',
        phone: '0123456789',
        address: {
            line1: '57th cross, Richmond',
            line2: 'Circle, Church Road,'

        },
        gender: 'Male',
        dob: '2000-01-20'
    })

    const [isEdit, setIsEdit] = userState(false)
    return (

        <div> className='max-w-lg flex flex-col gap-2 text-sm'

            <hr className='bg-zinc-400 h-[1px] border-none'/>
            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text=neutral-700'>
                    <p className='front-medium'>EMAIL ID:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='front-medium'>Phone</p>
                    {
                        isEdit
                            ? <input className='bg-gray-100 max-w-52' type="text" value {userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                            : <p className='text-blue-400'>{userData.phone}</p>
                    }
                    <p className='front-medium'>Address:</p>
                    {
                        isEdit
                            ? <p>
                                <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type='text' />
                                <br />
                                <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type='text' />

                            </p>
                            : <p className='text-blue-500'>
                                {userData.address.line1}
                                <br />
                                {userData.address.line2}
                            </p>
                    }
                </div>
            </div>
            <div>
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className=' grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text=neutral-700'>
                    <p classname='front-medium'>Gender</p>
                    {
                        isEdit
                            ? <select className='mx-w-20 bg-gray-100'> onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}/>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            : <p className='text-gray-400'>{userData.gender}</p>
                    }
                    <p classname='front-medium'>Birthday</p>
                    {
                        isEdit 
                        ? <input className='mx-w-20 bg-gray-100' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob}/>
                        : <p className='text-gray-400'>{userData.dob}</p>
                          
                    }

                </div>
            </div>
            <div className='mt-10'>
                {
                    isEdit
                    ? <button className='border border-primary px-8 py-2 rounded-full'> onClick={()=>setIsEdit(false)} Save Information</button>
                    : <button className='border border-primary px-8 py-2 rounded-full' > onClick={()=>setIsEdit(true)}Edit</button>
                }
            </div>

        </div>
    )
}

export default Login