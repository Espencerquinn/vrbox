import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import {connect} from 'react-redux'
import {setAttribute} from '../../ducks/reducer'


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  getSignedRequest = ([file]) => {
    console.log('hit')
    this.props.setAttribute({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

 // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
    .get('/api/signs3', {
        params: {
            'file-name': fileName,
            'file-type': file.type,
        },
    })
    .then(response => {
    const { signedRequest, url } = response.data;
    this.uploadFile(file, signedRequest, url);
    })
    .catch(err => {
    console.log(err);
    });
};

uploadFile = (file, signedRequest, url) => {
const options = {
  headers: {
    'Content-Type': file.type,
  },
};

axios
  .put(signedRequest, file, options)
  .then(response => {
    this.props.setAttribute({ isUploading: false, url });
    
  
    // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
  })
  .catch(err => {
    this.props.setAttribute({
      isUploading: false,
    });
    if (err.response.status === 403) {
      alert(
        `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
          err.stack
        }`
      );
    } else {
      alert(`ERROR: ${err.status}\n ${err.stack}`);
    }
  });
};

render() {
  return (
    <React.Fragment>
      
      <Grid container spacing={24}>
      <Grid item xs={12}>
          <TextField
            required
            id="username"
            name="username"
            label="Create Username"
            fullWidth
            autoComplete="fname"
            onBlur={(e) => this.props.setAttribute({username: e.target.value})}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Create Password"
            fullWidth
            autoComplete="password"
            onBlur={(e) => this.props.setAttribute({password: e.target.value})}

          />
        </Grid>
                {/* <Typography variant="h6" gutterBottom>
                Drop your profile pic below
              </Typography> */}
              <Typography variant="h6" gutterBottom>
        
        <Dropzone 
                onDropAccepted={this.getSignedRequest}
                style={{
                  height: 200,
                    borderWidth: 7,
                    marginTop: 100,
                    borderColor: 'rgb(102, 102, 102)',
                      position: 'relative',
                    width: 200,
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 28,
                  }}
                  accept="image/*"
                  multiple={false}
                >

                {({getRootProps}) => (
                  <div {...getRootProps()}>
                    {this.props.isUploading ? <GridLoader 
                    /> : <p>Drop Profile Pic Here </p>}
                  </div>
                )}
              </Dropzone>
              
              </Typography>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="I'm ready to be amazed"
          />
        </Grid>
      </Grid>
      
    </React.Fragment>
    );
  }
}

let mapDispatchToProps = {
  setAttribute 
}

export default connect (null, mapDispatchToProps)(Profile);