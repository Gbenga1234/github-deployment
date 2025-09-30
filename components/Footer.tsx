import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary-400">TechConsult Pro</h3>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for IT consulting and digital transformation. 
              We help businesses leverage technology for growth and success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Github size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Cybersecurity</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Digital Transformation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Data Analytics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">IT Strategy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Our Team</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-primary-400" size={20} />
                <span className="text-gray-300">contact@techconsultpro.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-primary-400" size={20} />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-primary-400 mt-1" size={20} />
                <span className="text-gray-300">123 Tech Street<br />Silicon Valley, CA 94000</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 TechConsult Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

