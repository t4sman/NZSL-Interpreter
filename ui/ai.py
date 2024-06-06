import numpy as np
import tensorflow as tf
import keras


encoder_model = keras.models.load_model('models/encoder_model.keras')
decoder_model = keras.models.load_model('models/decoder_model.keras')

# Define start and end tokens
SOS = 7352 # Start of sequence
EOS = 0 # End of sequence

# Define a function to predict decoder output
@tf.function(reduce_retracing=True)
def predict_decoder(decoder_inputs, decoder_states, encoder_outputs):
    return decoder_model([decoder_inputs] + decoder_states + [encoder_outputs])

def decode_sequence(input_seq):

    # Reshape input data
    pose_input_data = np.array(input_seq[0]).reshape(1, -1, 23 * 3).astype(np.float16)
    left_hand_input_data = np.array(input_seq[1]).reshape(1, -1, 21 * 3).astype(np.float16)
    right_hand_input_data = np.array(input_seq[2]).reshape(1, -1, 21 * 3).astype(np.float16)

    # Encode the input sequence to get the encoder states
    encoder_outputs, state_h, state_c = encoder_model.predict([pose_input_data, left_hand_input_data, right_hand_input_data])
    
    # Save the states value
    states_value = [state_h, state_c]

    # Start the sequence with the start token
    target_seq = np.array([[SOS]]).reshape(1, -1, 1).astype(np.int16) 

    # Initialize the decoded sequence
    decoded_sequence = [] 

    # Initialize the last token index
    last_token_index = None
    for i in range(26): # Maximum sequence length, the alphabet is the largest sequence it is trained on

        # Predict the output token
        output_tokens, h, c = predict_decoder(target_seq, states_value, encoder_outputs)

        # Sample a token
        sampled_token_index = np.argmax(output_tokens[0, -1, :])

        # If the sampled token is the same as the last token, sample the second highest token
        if sampled_token_index == last_token_index:
            top_tokens = np.argsort(output_tokens[0, -1, :])[-2:]
            sampled_token_index = top_tokens[0] if top_tokens[1] == last_token_index else top_tokens[1]

        # Break if the sampled token is the end token
        if sampled_token_index == EOS:
            break

        # Append the sampled token to the decoded sequence
        decoded_sequence.append(sampled_token_index)

        # Update the target sequence
        target_seq = np.append(target_seq, [[[sampled_token_index]]], axis=1)

        # Update states value
        states_value = [h, c]

        # Update the last token index
        last_token_index = sampled_token_index

    return decoded_sequence


