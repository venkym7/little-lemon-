// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { ChakraProvider, Box, Container, FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea, HStack} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const socials = [
  { icon: faTwitter, href: 'https://twitter.com/yourprofile' },
  { icon: faGithub, href: 'https://github.com/yourprofile' },
  { icon: faLinkedin, href: 'https://linkedin.com/in/yourprofile' }
];

const greeting = "Hello, I'm John Doe";
const bio1 = "I'm a passionate web developer.";
const bio2 = "I love creating beautiful and functional websites.";

const projects = [
  {
    title: 'Project 1',
    description: 'Description for Project 1',
    image: 'photo1.jpg',
    link: 'https://example.com/project1'
  },
  {
    title: 'Project 2',
    description: 'Description for Project 2',
    image: 'photo2.jpg',
    link: 'https://example.com/project2'
  }
];

const Header = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > scrollPos) {
        headerRef.current.style.transform = 'translateY(-100px)';
      } else {
        headerRef.current.style.transform = 'translateY(0)';
      }
      setScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPos]);

  const handleClick = (id) => {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box ref={headerRef} bg="black" color="white" p={4} position="fixed" top={0} width="100%" transition="transform 0.3s">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <HStack spacing={4}>
          {socials.map((social, index) => (
            <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
              <FontAwesomeIcon icon={social.icon} size="2x" />
            </a>
          ))}
        </HStack>
        <HStack spacing={4}>
          <a href="#projects-section" onClick={() => handleClick('#projects-section')} style={{ color: 'white', textDecoration: 'none' }}>
            Projects
          </a>
          <a href="#contactme-section" onClick={() => handleClick('#contactme-section')} style={{ color: 'white', textDecoration: 'none' }}>
            Contact Me
          </a>
        </HStack>
      </Box>
    </Box>
  );
};

const LandingSection = () => {
  return (
    <Box id="landing-section" p={8} textAlign="center">
      <img
        style={{ borderRadius: '50%', width: '150px', height: '150px' }}
        src="https://i.pravatar.cc/150?img=7"
        alt="Avatar"
      />
      <Box mt={4}>
        <h1>{greeting}</h1>
        <p>{bio1}</p>
        <p>{bio2}</p>
      </Box>
    </Box>
  );
};

const Card = ({ title, description, image, link }) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      width="300px"
    >
      <img
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        src={image}
        alt={title}
      />
      <Box mt={4}>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'teal' }}>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </a>
      </Box>
    </Box>
  );
};

const ProjectsSection = () => {
  return (
    <Box id="projects-section" p={8}>
      <Box display="flex" flexWrap="wrap" gap={8}>
        {projects.map((project, index) => (
          <Card
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
          />
        ))}
      </Box>
    </Box>
  );
};

const ContactMeSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: 'hireMe',
      comment: ''
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      alert(`Thank you, ${values.firstName}!`);
      resetForm();
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      comment: Yup.string().min(25, 'Must be at least 25 characters').required('Required')
    })
  });

  return (
    <Box id="contactme-section" p={8}>
      <form onSubmit={formik.handleSubmit}>
        <Box mb={4}>
          <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
            <FormLabel htmlFor="firstName">Name</FormLabel>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              {...formik.getFieldProps('firstName')}
            />
            <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={formik.touched.email && formik.errors.email}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              {...formik.getFieldProps('email')}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
            <FormLabel htmlFor="comment">Message</FormLabel>
            <Textarea
              id="comment"
              name="comment"
              {...formik.getFieldProps('comment')}
            />
            <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
          </FormControl>
        </Box>
        <Button type="submit" colorScheme="teal" isLoading={isLoading}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Header />
      <Container maxW="container.lg">
        <LandingSection />
        <ProjectsSection />
        <ContactMeSection />
      </Container>
    </ChakraProvider>
  );
}; 

export default App;
