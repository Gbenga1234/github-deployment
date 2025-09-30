import { ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-primary-50 to-white pt-20">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your Business with
                <span className="text-primary-600"> Expert IT Consulting</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We help businesses leverage cutting-edge technology to drive growth, 
                improve efficiency, and stay competitive in the digital age.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Cloud Migration & Strategy</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Digital Transformation</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-700">Cybersecurity Solutions</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center justify-center space-x-2">
                <span>Start Your Journey</span>
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Transform?</h3>
                  <p className="text-gray-600">Get your free consultation today</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Cloud Strategy</h4>
                    <p className="text-sm text-gray-600">Optimize your cloud infrastructure</p>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Security Audit</h4>
                    <p className="text-sm text-gray-600">Comprehensive security assessment</p>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Digital Solutions</h4>
                    <p className="text-sm text-gray-600">Modernize your technology stack</p>
                  </div>
                </div>
                
                <button className="w-full btn-primary">
                  Schedule Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

