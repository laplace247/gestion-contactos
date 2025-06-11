import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import contactService from '../services/contactService';

const ContactDetails = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams();

  // Usar useCallback para evitar el warning de dependencias
  const loadContact = useCallback(async () => {
    try {
      setLoading(true);
      const data = await contactService.getContactById(id);
      setContact(data);
      setError('');
    } catch (err) {
      setError(err.message);
      toast.error('Error al cargar el contacto');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadContact();
  }, [loadContact]);

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-2">Cargando detalles del contacto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => navigate('/')}>
            Volver a la lista
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!contact) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          <Alert.Heading>Contacto no encontrado</Alert.Heading>
          <p>El contacto que buscas no existe o ha sido eliminado.</p>
          <Button variant="outline-warning" onClick={() => navigate('/')}>
            Volver a la lista
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  <i className="fas fa-user-circle me-2"></i>
                  Detalles del Contacto
                </h4>
                <Badge bg="light" text="dark">
                  ID: {contact._id?.slice(-6)}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <h6 className="text-muted mb-1">
                      <i className="fas fa-user me-1"></i>
                      NOMBRE COMPLETO
                    </h6>
                    <h5 className="text-primary">{contact.name}</h5>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <h6 className="text-muted mb-1">
                      <i className="fas fa-building me-1"></i>
                      EMPRESA
                    </h6>
                    <h5>{contact.company || 'No especificada'}</h5>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <h6 className="text-muted mb-1">
                      <i className="fas fa-envelope me-1"></i>
                      EMAIL
                    </h6>
                    <p className="mb-0">
                      <a 
                        href={`mailto:${contact.email}`} 
                        className="text-decoration-none"
                      >
                        {contact.email}
                      </a>
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <h6 className="text-muted mb-1">
                      <i className="fas fa-phone me-1"></i>
                      TELÉFONO
                    </h6>
                    <p className="mb-0">
                      <a 
                        href={`tel:${contact.phone}`} 
                        className="text-decoration-none"
                      >
                        {contact.phone}
                      </a>
                    </p>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <h6 className="text-muted mb-1">
                      <i className="fas fa-calendar-plus me-1"></i>
                      FECHA DE CREACIÓN
                    </h6>
                    <p className="mb-0">{formatDate(contact.createdAt)}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <h6 className="text-muted mb-1">
                      <i className="fas fa-calendar-edit me-1"></i>
                      ÚLTIMA ACTUALIZACIÓN
                    </h6>
                    <p className="mb-0">{formatDate(contact.updatedAt)}</p>
                  </div>
                </Col>
              </Row>

              <hr />

              <div className="d-flex justify-content-between flex-wrap gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/')}
                >
                  <i className="fas fa-arrow-left me-1"></i>
                  Volver a la Lista
                </Button>
                
                <div className="d-flex gap-2">
                  <Button 
                    variant="warning" 
                    onClick={() => navigate(`/edit/${contact._id}`)}
                  >
                    <i className="fas fa-edit me-1"></i>
                    Editar
                  </Button>
                  
                  <Button 
                    variant="success" 
                    href={`mailto:${contact.email}`}
                  >
                    <i className="fas fa-envelope me-1"></i>
                    Enviar Email
                  </Button>
                  
                  <Button 
                    variant="info" 
                    href={`tel:${contact.phone}`}
                  >
                    <i className="fas fa-phone me-1"></i>
                    Llamar
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactDetails;