import React from 'react';
import { Mail, Phone, Building, Star, Edit2, Trash2, Calendar, MapPin, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactCard = ({ contact, onEdit, onDelete, onToggleFavorite }) => {
  const { _id, name, email, phone, company, favorite, createdAt } = contact;
  
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="card contact-card"
    >
      {/* Top Banner section */}
      <div style={{ height: '60px', background: 'var(--bg-tertiary)', position: 'relative' }}>
        <button 
          onClick={() => onToggleFavorite(_id, contact)}
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem',
            color: favorite ? '#f59e0b' : 'var(--text-tertiary)',
            filter: favorite ? 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.4))' : 'none',
            transition: 'var(--transition)'
          }}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star size={20} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div style={{ padding: '0 1.5rem 1.5rem', marginTop: '-28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="flex-between mb-4" style={{ alignItems: 'flex-end' }}>
          <div className="avatar">
            {getInitials(name)}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{name}</h3>
          {company && (
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
              <Building size={14} /> {company}
            </p>
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
            <div style={{ padding: '0.4rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
              <Mail size={16} color="var(--accent-primary)" />
            </div>
            <span style={{ fontSize: '0.95rem', wordBreak: 'break-all' }}>{email}</span>
          </div>
          
          {phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
              <div style={{ padding: '0.4rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                <Phone size={16} color="var(--accent-secondary)" />
              </div>
              <span style={{ fontSize: '0.95rem' }}>{phone}</span>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={14} /> Added {formatDate(createdAt)}
          </div>
          
          <div className="flex-center gap-2">
            <button onClick={() => onEdit(contact)} className="btn-icon" style={{ padding: '0.4rem' }} title="Edit">
              <Edit2 size={16} />
            </button>
            <button onClick={() => onDelete(_id)} className="btn-icon" style={{ padding: '0.4rem', hoverColor: 'var(--danger)' }} title="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;
