import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
const CustomModal = ({ toggle, onSave, activeItem }) => {
  const [selectedItem, setSelectedItem] = useState(activeItem);
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }
    setSelectedItem((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='title'>Title</Label>
            <Input
              type='text'
              name='title'
              value={selectedItem.title}
              onChange={handleChange}
              placeholder='Enter Todo Title'
            />
          </FormGroup>
          <FormGroup>
            <Label for='description'>Description</Label>
            <Input
              type='text'
              name='description'
              value={selectedItem.description}
              onChange={handleChange}
              placeholder='Enter Todo description'
            />
          </FormGroup>
          <FormGroup check>
            <Label for='completed'>
              <Input
                type='checkbox'
                name='completed'
                checked={selectedItem.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='success' onClick={() => onSave(selectedItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
