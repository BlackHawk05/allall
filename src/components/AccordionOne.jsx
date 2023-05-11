import React, { useState } from 'react'
import AccordionItemOne from './AccordionItemOne'

const header = `How long we deliver your first blog post?`
const text = `It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available .`

const faqs = [
    {
        id: 1,
        header,
        text,
    },
    {
        id: 2,
        header,
        text,
    },
    {
        id: 3,
        header,
        text,
    },
    {
        id: 4,
        header,
        text,
    },
    {
        id: 5,
        header,
        text,
    },
]

const AccordionOne = () => {
    const [active, setActive] = useState(null)

    const handleToggle = (index) => {
        if (active === index) {
            setActive(null)
        } else {
            setActive(index)
        }
    }

    return (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5'>
                <h3 className='font-medium text-black dark:text-white'>
                    Accordions Style 1
                </h3>
            </div>

            <div className='p-4 sm:p-6 xl:p-12.5'>
                <div className='grid grid-cols-1 gap-y-6 gap-x-4 md:gap-x-6 xl:grid-cols-2 xl:gap-x-7.5'>
                    <div className='flex flex-col gap-6'>
                        {faqs.map((faq, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <AccordionItemOne
                                        key={index}
                                        active={active}
                                        handleToggle={handleToggle}
                                        faq={faq}
                                    />
                                )
                            }
                        })}
                    </div>

                    <div className='flex flex-col gap-6'>
                        {faqs.map((faq, index) => {
                            if (index % 2 !== 0) {
                                return (
                                    <AccordionItemOne
                                        key={index}
                                        active={active}
                                        handleToggle={handleToggle}
                                        faq={faq}
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccordionOne;
