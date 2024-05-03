import * as tf from '@tensorflow/tfjs';
import * as backend from '../backend/Backend';

// Now you can use these models for inference
export async function setupInference(){
    const encoderModelPath = 'http://localhost:3000/models/encoder_model/model.json';
    const decoderModelPath = 'http://localhost:3000/models/decoder_model/model.json';    
    let encoderModel;
    let decoderModel;
    try {
        encoderModel = await tf.loadLayersModel(encoderModelPath);
        console.log('Encoder model loaded successfully');
    } catch (error) {
        console.error('Error loading encoder model:', error);
    }

    try {
        decoderModel = await tf.loadLayersModel(decoderModelPath);
        console.log('Decoder model loaded successfully');
    } catch (error) {
        console.error('Error loading decoder model:', error);
    }  
    const EOS = 0;
    let SOS;

    backend.getNumberOfSigns().then(numberOfSigns => {
        SOS = parseInt(numberOfSigns) + 1;
        // Rest of your code that depends on SOS goes here
    });
    function decodeSequence(inputSeq) {
        
        // Encode the input as state vectors.
        const statesValue = encoderModel.predict(inputSeq);

        // Generate empty target sequence of length 1.
        const targetSeq = tf.zeros([1, 1, 1]);
        // Populate the first character of target sequence with the start character.
        targetSeq.tensor[0][0][0] = SOS;

        // Sampling loop for a batch of sequences
        const decodedSequence = [];
        
        for (let i = 0; i < 20; i++) {
            const [outputTokens, h, c] = decoderModel.predict([targetSeq], statesValue);

            // Sample a token
            let sampledTokenIndex = tf.argMax(outputTokens.tensor[0][outputTokens.tensor[0].length - 1]);
            sampledTokenIndex = sampledTokenIndex.dataSync()[0];
            if (sampledTokenIndex === EOS) {
                break;
            }
            decodedSequence.push(sampledTokenIndex);

            // Update the target sequence (of length 1).
            targetSeq.tensor[0][0][0] = sampledTokenIndex;

            // Update states
            statesValue[0].dispose();
            statesValue[1].dispose();
            statesValue[0] = h;
            statesValue[1] = c;
        }

        return decodedSequence;
    }
    return decodeSequence;
}

export default setupInference;



