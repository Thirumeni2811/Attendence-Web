import React from 'react'
import { formatDate, formatTimeToIST } from '../utils/DateTime'

const OrgDetails = ({ data }) => {
    console.log(data)
    return (
        <>
            {/* Batch */}
            <section className='form-container'>
                <div>
                    <p className='text-primary font-bold text-lg uppercase'>Total Batches - {data?.batch?.length || 0}</p>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {
                            data?.batch?.map((item, index) => (
                                <div key={index} className='dark:text-textDark font-bold shadow-2xl px-4 py-2 rounded-lg text-center bg-bgColorLightSec dark:bg-black'>
                                    <div>{item}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>

            {/* Employees */}
            <section className='form-container'>
                <div>
                    <p className='text-primary font-bold text-lg uppercase'>Total Employees - {data?.employees?.length || 0}</p>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {
                            data?.employees?.map((item, index) => (
                                <div key={index} className='dark:text-textDark font-bold shadow-2xl px-4 py-2 rounded-lg text-center bg-bgColorLightSec dark:bg-black'>
                                    <div>{item?.name || ""}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>

            {/* Departments */}
            <section className='form-container'>
                <div>
                    <p className='text-primary font-bold text-lg uppercase'>Total Departments - {data?.department?.length || 0}</p>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {
                            data?.department?.map((item, index) => (
                                <div key={index} className='dark:text-textDark font-bold shadow-2xl px-4 py-2 rounded-lg text-center bg-bgColorLightSec dark:bg-black'>
                                    <div>{item?.name || ""}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>

            {/* Designations */}
            <section className='form-container'>
                <div>
                    <p className='text-primary font-bold text-lg uppercase'>Total Designations - {data?.designation?.length || 0}</p>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {
                            data?.designation?.map((item, index) => (
                                <div key={index} className='dark:text-textDark font-bold shadow-2xl px-4 py-2 rounded-lg text-center bg-bgColorLightSec dark:bg-black'>
                                    <div>{item?.name || ""}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>

            {/* Holidays */}
            <section className='form-container'>
                <div>
                    <p className='text-primary font-bold text-lg uppercase'>Total Holidays - {data?.holiday?.length || 0}</p>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {
                            data?.holiday?.map((item, index) => (
                                <div key={index} className='dark:text-textDark font-bold shadow-2xl px-4 py-2 rounded-lg text-center bg-bgColorLightSec dark:bg-black'>
                                    <div>{formatDate(item?.date || "")}</div>
                                    <div>{item?.reason || ""}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>

            {/* Schedules */}
            <section className='form-container'>
                <div>
                    <p className='text-primary font-bold text-lg uppercase'>Total Schedules - {data?.schedule?.length || 0}</p>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4'>
                        {
                            data?.schedule?.map((item, index) => (
                                <div key={index} className='dark:text-textDark font-bold shadow-2xl px-4 py-2 rounded-lg text-center bg-bgColorLightSec dark:bg-black'>
                                    <div>{item?.name || ""}</div>
                                    <div>{formatTimeToIST(item?.workingHours?.startTime || "")} - {formatTimeToIST(item?.workingHours?.endTime || "")} </div>
                                    <div>Total Breaks - {item.breaks.length || 0}</div>                                
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>
        </>
    )
}

export default OrgDetails