/* --- file: components/Footer.tsx --- */
import { GraduationCap } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center"
                suppressHydrationWarning={true}
              >
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">CareerLaunch</span>
            </div>
            <p className="text-slate-400 text-sm">
              Transforming university graduate outcomes through structured
              industry transition pathways.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Career Roadmaps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Analytics Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  ROI Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Integration Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Implementation Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>hello@careerlaunch.uk</li>
              <li>+44 20 7946 0958</li>
              <li>London, United Kingdom</li>
            </ul>
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                Book Demo Call
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <div>© 2025 CareerLaunch. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              GDPR Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
