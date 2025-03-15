import { useContext, useState, useEffect } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { addTask as taskCreate, fetchTasks, updateTask, deleteTask } from '../services/api';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [modal, setModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);

    useEffect(() => {
        retrieveTasks();
    }, []);

    const retrieveTasks = async () => {
        const token = localStorage.getItem('token');
        const response = await fetchTasks(token);
        if (response) {
            setTasks(response);
        }
    };

    const toggleModal = () => {
        if (modal) {
            setTask('');
            setIsEdit(false);
            setUpdateData(null);
        }
        setModal(!modal);
    };
    

    const handleTaskSubmit = async () => {
        const token = localStorage.getItem('token');
        if (task.trim()) {
            const payload = {
                taskName: task,
                dueDate: new Date().toISOString(),
            };

            if (isEdit && updateData) {
                payload._id = updateData._id;
                await updateTask(payload, token);
            } else {
                await taskCreate(payload, token);
            }
            
            toggleModal();
            retrieveTasks();
            setTask('');
            setUpdateData(null);
            setIsEdit(false);
        }
    };

    const handleEdit = (task) => {
        setTask(task.taskName);
        setUpdateData(task);
        setIsEdit(true);
        toggleModal();
    };

    const handleDelete = async (task) => {
        const token = localStorage.getItem('token');
        await deleteTask(task, token);
        retrieveTasks();
    };

    return (
        <div className="container p-0">
            <Row className="mb-3 d-flex align-items-center">
                <Col><h2>Task Management</h2></Col>
                <Col className="text-end">
                    <Button color="primary" className="rounded-pill" onClick={toggleModal}>
                        <FaPlus /> Add Task
                    </Button>
                </Col>
            </Row>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task Name</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((t, index) => (
                        <tr key={t._id}>
                            <td>{index + 1}</td>
                            <td>{t.taskName}</td>
                            <td>{new Date(t.dueDate).toLocaleDateString()}</td>
                            <td>
                                <Dropdown isOpen={dropdownOpen === t._id} toggle={() => setDropdownOpen(dropdownOpen === t._id ? null : t._id)}>
                                    <DropdownToggle tag="span" style={{ cursor: 'pointer' }}>
                                        <FaEllipsisV />
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        <DropdownItem onClick={() => handleEdit(t)}>Edit</DropdownItem>
                                        <DropdownItem onClick={() => handleDelete(t)}>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal isOpen={modal} toggle={toggleModal} modalClassName="border-0">
                <div className="modal-content border-0 p-0">
                    <ModalHeader toggle={toggleModal} className="border-0">
                        {isEdit ? 'Edit Task' : 'Add Task'}
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Task Name"
                        />
                    </ModalBody>
                    <ModalFooter className="border-0">
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        <Button color="primary" onClick={handleTaskSubmit}>
                            {isEdit ? 'Update' : 'Add'}
                        </Button>
                    </ModalFooter>
                </div>
            </Modal>

        </div>
    );
};

export default Tasks;















