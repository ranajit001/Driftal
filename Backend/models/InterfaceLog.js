import mongoose from 'mongoose';


const interfaceLogSchema = new mongoose.Schema({
  interfaceName: {
    type: String,
    required: true
  },
  integrationKey: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['success', 'failure', 'warning']
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('InterfaceLog', interfaceLogSchema);
