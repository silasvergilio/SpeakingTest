

  var zip = new JSZip();

  Vue.component('exercise', {
    template: '#exercise-template',
    props: {
      name: {
        type: String,
        required: true
      },
      hasSound: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      source: {
        type: String,
        required: false
      },
      question: {
        type: String,
        required: true
      },
      seconds: {
        type: Number,
        required: true
      }
    },

    mounted: function () {

      if(this.hasSound){
      
        new GreenAudioPlayer(`.${this.name}`);
  }
    },

    methods: {

        recordMethod: function() {


        captureUserMedia(mediaConstraints, onMediaSuccess.bind(this,this.name,this.seconds,`.${this.name}-class`), onMediaError);

        },
    }
  })


  new Vue({
    el: '#app'
  })
