import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [activeTab, setActiveTab] = useState(0);

    const faqs = [
        {
            title: 'What documents are typically required for university applications?',
            content: 'Transcripts, letters of recommendation, a personal statement, and standardized test scores like the SAT or ACT.'
        },
        {
            title: 'Are there language proficiency tests required for admission?',
            content: 'Yes, many universities require language proficiency tests like the TOEFL or IELTS for non-native English speakers. However, requirements vary by institution.'
        },
        {
            title: 'How long does it typically take to receive a response from universities after applying?',
            content: 'Response times vary, but it usually takes several weeks to a few months to receive a response from universities after applying.'
        },

        {
            title: 'How do I reach out to a university?',
            content: 'You can contact universities directly through their admissions offices, typically via email or phone. Contact information is usually available on their official websites.'
        },
        {
            title: 'Where can I locate scholarships?',
            content: 'You can find scholarships through various sources, including Hillpad’s scholarship database, university websites, government organizations, and private foundations.'
        },
        {
            title: 'Where do I find an application form?',
            content: 'Application forms are usually available on university websites. You can also access them through Hillpad’s platform if you’re applying through our service.'
        }
    ];

    const handleTabClick = (index) => {
        setActiveTab(index === activeTab ? -1 : index);
    };

    return (
        <div className="relative mt-[5%]">
            {/* Hero Section with Background Image */}
            <div className="relative  h-[350px] bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://hillpad.com/blog/wp-content/uploads/2024/03/MicrosoftTeams-image-scaled.jpg')`,
                    borderBottomRightRadius: '100px'
                }}>
                <div
                    className="absolute inset-0 bg-black opacity-40"
                    style={{ borderBottomRightRadius: '100px' }}
                ></div>
                <div className="absolute top-20 inset-0 bg-gradient-to-r from-black/50 to-transparent">

                    <div className="p-10  text-white">
                        <h1 className="text-6xl font-bold mb-4">FAQ</h1>
                        <p className="text-2xl">Frequently Asked Questions</p>
                    </div>
                </div>
            </div>

            {/* FAQ Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-1">
                        <h2 className="text-xl text-orange mb-2">Have Any Questions?</h2>
                        <h3 className="text-3xl font-bold text-orange mb-4">FAQ's</h3>
                        <p className="text-light_black">
                            Here are questions others have asked that you might find helpful
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-2">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg overflow-hidden"
                                >
                                    <button
                                        className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                                        onClick={() => handleTabClick(index)}
                                    >
                                        <span className=" text-lg text-black font-bold">{faq.title}</span>
                                        {activeTab === index ? (
                                            <ChevronUp className="flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="flex-shrink-0" />
                                        )}
                                    </button>
                                    {activeTab === index && (
                                        <div className="p-4 bg-white">
                                            <p className="text-grey">{faq.content}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;