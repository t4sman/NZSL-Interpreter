const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const fetch = require('node-fetch');
const backend = require('./backend/Backend');


const encoderModelPath = 'ai/encoder_model.keras';
const decoderModelPath = 'ai/decoder_model.keras';
const EOS = 0;
let SOS;

backend.getNumberOfSigns().then(numberOfSigns => {
    SOS = parseInt(numberOfSigns) + 1;
    // Rest of your code that depends on SOS goes here
});
const encoderModel = await tf.loadLayersModel('file://' + encoderModelPath);
const decoderModel = await tf.loadLayersModel('file://' + decoderModelPath);


    

// Now you can use these models for inference
function decodeSequence(inputSeq) {
    // Encode the input as state vectors.
    const statesValue = encoderModel.predict(inputSeq);

    // Generate empty target sequence of length 1.
    const targetSeq = tf.zeros([1, 1, 1]);
    // Populate the first character of target sequence with the start character.
    targetSeq.tensor[0, 0, 0] = SOS;

    // Sampling loop for a batch of sequences
    const decodedSequence = [];
    let lastTokenIndex = null;
    for (let i = 0; i < 20; i++) {
        const [outputTokens, h, c] = decoderModel.predict([targetSeq].concat(statesValue));

        // Sample a token
        let sampledTokenIndex = tf.argMax(outputTokens.tensor[0, -1]);
        sampledTokenIndex = sampledTokenIndex.dataSync()[0];
        if (sampledTokenIndex === lastTokenIndex) {
            // If the model tries to predict the same sign again, choose the sign with the second highest probability instead
            const topTokens = tf.topk(outputTokens.tensor[0, -1], 2);
            const topTokensData = topTokens.indices.dataSync();
            sampledTokenIndex = topTokensData[0] === lastTokenIndex ? topTokensData[1] : topTokensData[0];
        }
        if (sampledTokenIndex === EOS) {
            break;
        }
        decodedSequence.push(sampledTokenIndex);

        // Update the target sequence (of length 1).
        targetSeq.tensor[0, 0, 0] = sampledTokenIndex;

        // Update states
        statesValue[0].dispose();
        statesValue[1].dispose();
        statesValue[0] = h;
        statesValue[1] = c;

        // Remember the last predicted token
        lastTokenIndex = sampledTokenIndex;
    }

    return decodedSequence;
}



// Usage example
const inputSeq = tf.tensor(); // Replace with your input sequence
const decodeSequence = await loadModels();
const decodedSeq = decodeSequence(inputSeq);
console.log(decodedSeq);