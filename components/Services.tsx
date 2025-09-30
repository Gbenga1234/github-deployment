import { Cloud, Shield, Smartphone, Database, Users, BarChart3 } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: <Cloud className="text-primary-600" size={32} />,
      title: "Cloud Solutions",
      description: "Migrate to the cloud with confidence. We design and implement scalable cloud architectures using AWS, Azure, and Google Cloud.",
      features: ["Cloud Migration", "Infrastructure as Code", "Cost Optimization", "Multi-Cloud Strategy"]
    },
    {
      icon: <Shield className="text-primary-600" size={32} />,
      title: "Cybersecurity",
      description: "Protect your business with comprehensive security solutions. From risk assessment to incident response.",
      features: ["Security Audits", "Threat Detection", "Compliance", "Incident Response"]
    },
    {
      icon: <Smartphone className="text-primary-600" size={32} />,
      title: "Digital Transformation",
      description: "Modernize your business processes with cutting-edge technology solutions and digital workflows.",
      features: ["Process Automation", "API Development", "Integration", "Workflow Optimization"]
    },
    {
      icon: <Database className="text-primary-600" size={32} />,
      title: "Data Analytics",
      description: "Turn your data into actionable insights with advanced analytics and business intelligence solutions.",
      features: ["Data Warehousing", "Business Intelligence", "Predictive Analytics", "Real-time Dashboards"]
    },
    {
      icon: <Users className="text-primary-600" size={32} />,
      title: "IT Strategy",
      description: "Develop a comprehensive IT strategy aligned with your business goals and objectives.",
      features: ["Technology Roadmaps", "Vendor Management", "Budget Planning", "Risk Assessment"]
    },
    {
      icon: <BarChart3 className="text-primary-600" size={32} />,
      title: "Performance Optimization",
      description: "Optimize your systems for maximum performance, reliability, and cost-effectiveness.",
      features: ["System Monitoring", "Performance Tuning", "Capacity Planning", "Disaster Recovery"]
    }
  ]

  return (
    <section id="services" className="bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive IT consulting services designed to accelerate your digital transformation 
            and drive business success.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="btn-primary">
            View All Services
          </button>
        </div>
      </div>
    </section>
  )
}

