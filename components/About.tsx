import { Award, Users, Clock, Target } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: <Users className="text-primary-600" size={24} />, number: "500+", label: "Happy Clients" },
    { icon: <Award className="text-primary-600" size={24} />, number: "15+", label: "Years Experience" },
    { icon: <Target className="text-primary-600" size={24} />, number: "1000+", label: "Projects Completed" },
    { icon: <Clock className="text-primary-600" size={24} />, number: "24/7", label: "Support Available" }
  ]

  return (
    <section id="about" className="bg-gray-50">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TechConsult Pro?</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                With over 15 years of experience in IT consulting, we've helped hundreds of businesses 
                transform their technology infrastructure and achieve their digital goals.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Award className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified Experts</h3>
                  <p className="text-gray-600">
                    Our team consists of certified professionals with expertise in cloud platforms, 
                    cybersecurity, and modern development practices.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Target className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Results</h3>
                  <p className="text-gray-600">
                    We've successfully delivered complex projects across various industries, 
                    from startups to Fortune 500 companies.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Clock className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600">
                    Our dedicated support team is available around the clock to ensure your 
                    systems run smoothly and efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="flex justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with innovative technology solutions that drive growth, 
                enhance security, and create competitive advantages in the digital marketplace. 
                We believe technology should be an enabler, not a barrier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

