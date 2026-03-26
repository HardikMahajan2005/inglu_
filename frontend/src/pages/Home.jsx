import React, { useState, useEffect } from 'react';
import { Plus, Users, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

import { contactService } from '../services/api';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ContactCard from '../components/ContactCard';
import ContactModal from '../components/ContactModal';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditingContact, setCurrentEditingContact] = useState(null);

  const fetchContacts = async (search = '') => {
    try {
      setLoading(true);
      const res = await contactService.getAll(search);
      setContacts(res.data);
    } catch (error) {
      toast.error('Connection failed. Server might be down.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSearch = (term) => {
    fetchContacts(term);
  };

  const handleAddNew = () => {
    setCurrentEditingContact(null);
    setIsModalOpen(true);
  };

  const handleEdit = (contact) => {
    setCurrentEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleSaveContact = async (contactData) => {
    try {
      let savedContact;
      if (currentEditingContact) {
        const res = await contactService.update(currentEditingContact._id, contactData);
        savedContact = res.data;
        setContacts(prev => prev.map(c => c._id === savedContact._id ? savedContact : c));
        toast.success('Contact updated');
      } else {
        const res = await contactService.create(contactData);
        savedContact = res.data;
        setContacts(prev => [savedContact, ...prev]);
        toast.success('Added to INGLU network');
      }
      setIsModalOpen(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Action failed';
      toast.error(errorMsg);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this contact permanently?')) {
      try {
        await contactService.delete(id);
        setContacts(prev => prev.filter(c => c._id !== id));
        toast.success('Contact removed');
      } catch (error) {
        toast.error('Failed to eliminate contact');
      }
    }
  };

  const handleToggleFavorite = async (id, contact) => {
    try {
      const updatedContact = { ...contact, favorite: !contact.favorite };
      await contactService.update(id, updatedContact);
      setContacts(prev => prev.map(c => c._id === id ? { ...c, favorite: !c.favorite } : c));
      
      toast.success(updatedContact.favorite ? 'Marked as key contact' : 'Removed from key contacts', {
        icon: updatedContact.favorite ? '🌟' : '☆',
      });
    } catch (error) {
      toast.error('Action failed');
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main style={{ flex: 1, position: 'relative' }}>
        {/* Background Visuals */}
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>

        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '2rem', position: 'relative', zIndex: 10 }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="badge badge-inglu mb-4" style={{ display: 'inline-flex' }}>Placement Task ✓</span>
            <h1 className="page-title">
              Manage Your <span className="text-gradient">INGLU Network</span>
            </h1>
            <p className="page-subtitle" style={{ margin: '0 auto' }}>
              A centralized hub to track applicants, employees, and corporate connections seamlessly across the organization.
            </p>
            
            <div className="flex-center mt-8 gap-4" style={{ flexDirection: 'column', sm: { flexDirection: 'row' } }}>
              <SearchBar onSearch={handleSearch} />
              <button 
                onClick={handleAddNew} 
                className="btn btn-primary" 
                style={{ padding: '1.25rem 2rem', fontSize: '1.05rem', whiteSpace: 'nowrap' }}
              >
                <Plus size={20} /> New Contact
              </button>
            </div>
          </div>

          {/* Subheader */}
          <div className="flex-between mb-8" style={{ marginTop: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>
              Directory <span style={{ color: 'var(--text-tertiary)', fontWeight: 400, marginLeft: '0.5rem', fontSize: '1.2rem' }}>({contacts.length})</span>
            </h2>
          </div>

          {/* Results Area */}
          {loading ? (
            <div className="loader-wrapper"><div className="loader"></div></div>
          ) : contacts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="empty-state"
            >
              <div className="empty-icon"><Users size={48} /></div>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Network is empty</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Add your first INGLU contact to start tracking your directory.</p>
              </div>
              <button onClick={handleAddNew} className="btn btn-primary mt-2">
                Get Started <ArrowRight size={18} />
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="contacts-grid">
              <AnimatePresence>
                {contacts.map((contact, index) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ContactCard 
                      contact={contact} 
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveContact}
        contact={currentEditingContact}
      />
    </div>
  );
};

export default Home;
