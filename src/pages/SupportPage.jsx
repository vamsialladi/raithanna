import { useState } from 'react';
import { HelpCircle, Phone, Mail, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const SupportPage = () => {
  const showToast = useToast();
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [orderNum, setOrderNum] = useState('');

  const FAQS = [
    {
      q: 'How does RythuMitra guarantee produce freshness?',
      a: 'Produce is harvested only after you place an order. Vegetables and fruits are collected directly from verified farms and dispatched via temperature-controlled delivery within 24 hours.'
    },
    {
      q: 'Can I return produce if I am not satisfied with quality?',
      a: 'Yes, RythuMitra provides a 100% replacement or instant refund guarantee at delivery if any produce fails our freshness inspection standards.'
    },
    {
      q: 'How are farmer prices determined?',
      a: 'Farmers set their fair market prices without intermediary deductions, receiving up to 40% higher realization compared to traditional wholesale markets.'
    },
    {
      q: 'Do you deliver bulk orders for commercial kitchens or apartments?',
      a: 'Yes! We support community pooling and bulk procurement with tailored packaging and bulk discounts.'
    }
  ];

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    showToast('Support ticket created. Our team will contact you within 2 hours!');
    setTicketSubject('');
    setTicketMessage('');
    setOrderNum('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Support & Help Center
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Dedicated assistance for orders, farmer connectivity, and delivery inquiries
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#198754]">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Farmer Helpline</p>
            <p className="text-xs font-bold text-gray-900">+91 1800 425 8899</p>
            <span className="text-[10px] text-emerald-700 font-semibold">7:00 AM - 9:00 PM</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Email Support</p>
            <p className="text-xs font-bold text-gray-900">support@rythumitra.org</p>
            <span className="text-[10px] text-blue-700 font-semibold">Response &lt; 2 hrs</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Quality Guarantee</p>
            <p className="text-xs font-bold text-gray-900">Instant Refund</p>
            <span className="text-[10px] text-purple-700 font-semibold">No questions asked</span>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-gray-900 mb-2">Frequently Asked Questions</h3>
        {FAQS.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={index}
              className="border border-gray-100 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? -1 : index)}
                className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-gray-800 hover:bg-gray-50"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {isOpen && (
                <div className="px-3.5 pb-3.5 text-xs text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Ticket */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Create Support Ticket</h3>
        <form onSubmit={handleCreateTicket} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Order Number (Optional)
              </label>
              <input
                type="text"
                value={orderNum}
                onChange={(e) => setOrderNum(e.target.value)}
                placeholder="e.g. RM-84920"
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Issue Subject
              </label>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Produce delivery delay or quality check"
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Description of the Issue
            </label>
            <textarea
              rows={3}
              required
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              placeholder="Describe your request in detail..."
              className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Ticket</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;
