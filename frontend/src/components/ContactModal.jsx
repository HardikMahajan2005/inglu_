import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Building, FileText, Briefcase } from 'lucide-react';

const ContactModal = ({ isOpen, onClose, onSave, contact = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || '',
        notes: contact.notes || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
      });
    }
  }, [contact, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2.5rem' }}
      >
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
              {contact ? 'Update Details' : 'New Contact'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {contact ? 'Modify employee or contact information in the INGLU network.' : 'Add a new contact to your INGLU network.'}
            </p>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} /> Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Hardik Assignment"
              style={{ borderColor: errors.name ? 'var(--danger)' : '' }}
            />
            {errors.name && <span style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '6px', display: 'block' }}>{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--accent-secondary)" /> Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. applicant@inglu.com"
              style={{ borderColor: errors.email ? 'var(--danger)' : '' }}
            />
            {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '6px', display: 'block' }}>{errors.email}</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={16} /> Company/Department
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-input"
                placeholder="Marketing / INGLU"
              />
            </div>
          </div>

          <div className="form-group mt-4">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} /> Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-input"
              placeholder="Meeting notes, context, or roles..."
              rows="3"
            ></textarea>
          </div>

          <div className="flex-between mt-8" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Briefcase size={18} />
              {contact ? 'Save Changes' : 'Add to Network'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
