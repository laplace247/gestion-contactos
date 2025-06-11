import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Alert, Spinner, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import contactService from '../services/contactService';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    // Filtrar contactos cuando cambie el término de búsqueda
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredContacts(filtered);
  }, [contacts, searchTerm]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAllContacts();
      setContacts(data);
      setError('');
    } catch (err) {
      setError(err.message);
      toast.error('Error al cargar los contactos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de eliminar el contacto "${name}"?`)) {
      try {
        await contactService.deleteContact(id);
        toast.success('Contacto eliminado exitosamente');
        loadContacts(); // Recargar la lista
      } catch (err) {
        toast.error('Error al eliminar el contacto');
      }
    }
  };

  const handleView = (id) => {
    navigate(`/contact/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-2">Cargando contactos...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <i className="fas fa-users me-2"></i>
                Gestión de Contactos
              </h4>
              <Button 
                variant="primary" 
                onClick={() => navigate('/create')}
              >
                <i className="fas fa-plus me-1"></i>
                Nuevo Contacto
              </Button>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              {/* Barra de búsqueda */}
              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Buscar contactos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="text-end">
                  <small className="text-muted">
                    {filteredContacts.length} de {contacts.length} contactos
                  </small>
                </Col>
              </Row>

              {filteredContacts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-address-book fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">
                    {contacts.length === 0 ? 'No hay contactos registrados' : 'No se encontraron contactos'}
                  </h5>
                  <p className="text-muted">
                    {contacts.length === 0 
                      ? 'Comienza agregando tu primer contacto'
                      : 'Intenta con otros términos de búsqueda'
                    }
                  </p>
                  {contacts.length === 0 && (
                    <Button variant="primary" onClick={() => navigate('/create')}>
                      <i className="fas fa-plus me-1"></i>
                      Crear Primer Contacto
                    </Button>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>
                          <i className="fas fa-user me-1"></i>
                          Nombre
                        </th>
                        <th>
                          <i className="fas fa-envelope me-1"></i>
                          Email
                        </th>
                        <th>
                          <i className="fas fa-phone me-1"></i>
                          Teléfono
                        </th>
                        <th>
                          <i className="fas fa-building me-1"></i>
                          Empresa
                        </th>
                        <th className="text-center">
                          <i className="fas fa-cogs me-1"></i>
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map((contact) => (
                        <tr key={contact._id}>
                          <td>
                            <strong>{contact.name}</strong>
                          </td>
                          <td>
                            <a href={`mailto:${contact.email}`} className="text-decoration-none">
                              {contact.email}
                            </a>
                          </td>
                          <td>
                            <a href={`tel:${contact.phone}`} className="text-decoration-none">
                              {contact.phone}
                            </a>
                          </td>
                          <td>
                            {contact.company || (
                              <span className="text-muted fst-italic">Sin empresa</span>
                            )}
                          </td>
                          <td className="text-center">
                            <div className="btn-group" role="group">
                              <Button
                                variant="info"
                                size="sm"
                                onClick={() => handleView(contact._id)}
                                title="Ver detalles"
                              >
                                <i className="fas fa-eye"></i>
                              </Button>
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleEdit(contact._id)}
                                title="Editar"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(contact._id, contact.name)}
                                title="Eliminar"
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactList;