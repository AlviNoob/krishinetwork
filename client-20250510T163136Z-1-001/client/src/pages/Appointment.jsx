import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
// import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const Appointment = () => {
    const { expertId } = useParams()
    const { experts, currencySymbol, serverUrl, token, getExpertsData } = useContext(AppContext)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const navigate = useNavigate()

    const [expertInfo, setExpertInfo] = useState(null)
    const [expertSlots, setExpertSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState("")

    const fetchexpertInfo = async () => {
        const expert = experts.find(expert => expert._id === expertId)
        setExpertInfo(expert)
    }

    const getAvailableSlots = async () => {
        if (!expertInfo) return

        setExpertSlots([])
        let today = new Date()

        let allSlots = []

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date(currentDate)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
                let day = currentDate.getDate()
                let month = currentDate.getMonth()
                let year = currentDate.getFullYear()
                const slotDate = `${day}_${month}_${year}`
                const isSlotAvailable = !(expertInfo.slots_booked?.[slotDate]?.includes(formattedTime))

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            allSlots.push(timeSlots)
        }

        setExpertSlots(allSlots)
    }

    const bookAppointment = async () => {
        if (!token) {
            // toast.warn('Login to book appointment')
            return navigate('/login')
        }

        try {
            const date = expertSlots[slotIndex][0].datetime
            const slotDate = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`

            const { data } = await axios.post(`${serverUrl}/api/user/book-appointment`, {
                expertId,
                slotDate,
                slotTime
            }, {
                headers: { token }
            })

            if (data.success) {
                // toast.success(data.message)
                getExpertsData()
                navigate('/my-appointments')
            } else {
                // toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            // toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchexpertInfo()
    }, [experts, expertId])

    useEffect(() => {
        if (expertInfo) getAvailableSlots()
    }, [expertInfo])

    useEffect(() => {
        console.log(expertSlots)
    }, [expertSlots])

    return expertInfo && (
        <div>
            {/* Expert Details */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex-1 border border-grey-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-grey-900'>
                        {expertInfo.name}
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-grey-600'>
                        <p>{expertInfo.degree} - {expertInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{expertInfo.experience}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-grey-900 mt-3'>About</p>
                        <p className='text-sm text-grey-500 max-w-[700px] mt-1'>{expertInfo.about}</p>
                    </div>
                    <p className='text-grey-500 font-medium mt-4'>
                        Appointment fee: <span className='text-grey-600'>{currencySymbol}{expertInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/* Booking Slots */}
            <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700'>
                <p>Booking slots</p>

                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {
                        expertSlots.length > 0 && expertSlots.map((item, index) => (
                            <div onClick={() => setSlotIndex(index)} key={index} className='cursor-pointer'>
                                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p>{item[0] && item[0].datetime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {
                        expertSlots.length > 0 && expertSlots[slotIndex]?.map((item, index) => (
                            <p onClick={() => setSlotTime(item.time)} key={index} className='cursor-pointer'>
                                {item.time.toLowerCase()}
                            </p>
                        ))
                    }
                </div>

                <div>
                    <button onClick={bookAppointment} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                        Book an appointment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Appointment
