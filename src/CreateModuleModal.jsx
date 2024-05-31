import React, { useState } from 'react';
import './CourseBuilder.css';
import emptyStateImage from './To-review.png';
import CreateModuleModal from './CreateModuleModal';

const CourseBuilder = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modules, setModules] = useState([]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const openModal = () => {
    setIsModalVisible(true);
    setDropdownVisible(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const createModule = (moduleName) => {
    if (moduleName.trim()) {
      setModules([...modules, moduleName]);
      setIsModalVisible(false);
    }
  };

  const editModule = (index, newName) => {
    const updatedModules = [...modules];
    updatedModules[index] = newName;
    setModules(updatedModules);
  };

  const deleteModule = (index) => {
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
  };

  return (
    <div className="container">
      <Header toggleDropdown={toggleDropdown} dropdownVisible={dropdownVisible} openModal={openModal} />
      {modules.map((module, index) => (
        <Module key={index} moduleName={module} index={index} editModule={editModule} deleteModule={deleteModule} />
      ))}
      {modules.length === 0 && <EmptyState />}
      <CreateModuleModal isVisible={isModalVisible} onClose={closeModal} onCreate={createModule} />
    </div>
  );
};

const Header = ({ toggleDropdown, dropdownVisible, openModal }) => (
  <div className="header">
    <h1>Course builder</h1>
    <AddButton toggleDropdown={toggleDropdown} dropdownVisible={dropdownVisible} openModal={openModal} />
  </div>
);

const AddButton = ({ toggleDropdown, dropdownVisible, openModal }) => (
  <div className="add-button">
    <button id="addButton" onClick={toggleDropdown}>
      + Add
    </button>
    {dropdownVisible && (
      <div className="dropdown-content">
        <a href="#" onClick={openModal}>Create module</a>
        <a href="#">Add a link</a>
        <a href="#">Upload</a>
      </div>
    )}
  </div>
);

const Module = ({ moduleName, index, editModule, deleteModule }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newModuleName, setNewModuleName] = useState(moduleName);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewModuleName(moduleName);
  };

  const handleSaveEdit = () => {
    if (newModuleName.trim()) {
      editModule(index, newModuleName);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    setNewModuleName(e.target.value);
  };

  return (
    <div className="module">
      {!isEditing ? (
        <>
          <span className="module-name">{moduleName}</span>
          <span className="module-options" onClick={handleEdit}>&#8942;</span>
        </>
      ) : (
        <div className="edit-module-form">
          <h2>Edit Module</h2>
          <button className="close-icon" onClick={handleCancelEdit}>✕</button>
          <input type="text" value={newModuleName} onChange={handleInputChange} />
          <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
          <button className="edit-button" onClick={handleSaveEdit}>Edit Changes</button>
        </div>
      )}
      <div className="module-options-dropdown">
        <a href="#" onClick={() => deleteModule(index)}>Delete</a>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="empty-state">
    <img src={emptyStateImage} alt="Empty state illustration" />
    <p>Nothing added here yet</p>
    <p>Click on the [+] Add button to add items to this course</p>
  </div>
);

export default CourseBuilder;
