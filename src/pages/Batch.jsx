import React, { useState } from 'react';
import ModalView1 from '../components/Modal/ModalView1';
import TextInput1 from '../components/form/Fields/TextInput1';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Button2 from '../components/form/Button/Button2';
import Error from '../components/form/Button/Error';
import axios from 'axios';
import { CONFIG, CREATE_BATCH } from '../services';

const Batch = ({ openModal, handleCloseModal }) => {
    const [batches, setBatches] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddBatch = () => {
        setBatches([...batches, ""]);
    };

    const handleRemoveBatch = (index) => {
        setBatches(batches.filter((_, i) => i !== index));
    };

    const handleBatchChange = (index, value) => {
        const updatedBatches = [...batches];
        updatedBatches[index] = value;
        setBatches(updatedBatches);
    };

    const navigate = useNavigate();

    const handleSkip = () => {
        navigate('/department');
    };

    const handleBatch = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            if (batches.length < 1 || batches.some(batch => batch.trim() === "")) {
                setError("Please add at least one batch name.");
                setLoading(false); 
                return;
            }    
            const data = {
                batch: batches
            }
            const response = await axios.patch(CREATE_BATCH, data, CONFIG);
            console.log(response);
            navigate('/department');
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalView1 open={openModal} onClose={handleCloseModal}>
            <section className='modelContainer p-4'>
                <h1 className='text-primary font-bold uppercase'>Batch Creation</h1>
                <p className="text-sm text-gray-500 mb-3">Cannot Be Modified After Setup</p>
                <Error error={error} />
                <form onSubmit={handleBatch}>
                    <Box className="grid gap-2">
                        {batches.map((batch, index) => (
                            <div key={index} className="flex items-center gap-4 mb-2">
                                <TextInput1
                                    id={`batch-${index}`}
                                    name={`batch-${index}`}
                                    label={`Batch ${index + 1}`}
                                    type="text"
                                    value={batch}
                                    onChange={(e) => handleBatchChange(index, e.target.value)}
                                    placeholder={`Batch ${index + 1}`}
                                />

                                {batches.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveBatch(index)} className="text-red-500 rounded">
                                        <CancelRoundedIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                    </Box>

                    <div className='grid grid-cols-2 gap-4'>
                        <div onClick={handleAddBatch} className='pt-4 flex justify-center'>
                            <div className='bg-primary text-white w-full px-6 py-2.5 text-lg rounded-xl font-bold cursor-pointer flex items-center justify-center'>
                                + Add
                            </div>
                        </div>

                        <div className='pt-4 flex justify-center'>
                            <Button2 name="Create" type="submit" />
                        </div>
                    </div>

                    <div onClick={handleSkip} className='flex justify-center cursor-pointer mt-2'>
                        Skip
                    </div>
                </form>
            </section>
        </ModalView1>
    );
};

export default Batch;
