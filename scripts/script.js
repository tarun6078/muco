new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Phir Miloge Na",
          artist: "Jal Raj",
          cover: "https://i.ytimg.com/vi/n0VNjUNjB-g/hqdefault.jpg",
          source: "mp3/1.mp3",
          url: "https://youtu.be/n0VNjUNjB-g",
          favorited: true, 
        },
        {
          name: "Aankhon ke darmiya",
          artist: "Rishabh Tiwari",
          cover: "https://i.ytimg.com/vi/hVNP9CY52qY/maxresdefault.jpg",
          source: "mp3/Ankhon.mp3",
          url: "https://www.youtube.com/watch?v=hVNP9CY52qY",
          favorited: true
        },
        {
          name: "Ranjha",
          artist: "B Praak, Jasleen",
          cover: "https://images.genius.com/2abb532cdab920ab09044dcd25447e7f.1000x1000x1.jpg",
          source: "mp3/Ranjha.mp3",
          url: "https://www.youtube.com/watch?v=V7LwfY5U5WI",
          favorited: true
        },
        {
          name: "Gali Gali ",
          artist: "Neha Kakkar",
          cover: "https://i.ytimg.com/vi/8MiauUcSTcg/maxresdefault.jpg",
          source: "mp3/Gali.mp3",
          url: "https://www.youtube.com/watch?v=1BVgpX4w0Wk",
          favorited: false
        },
        {
          name: "Bijlee Bijlee",
          artist: "Hardy Sandhu",
          cover: "https://a10.gaanacdn.com/images/albums/43/4824243/crop_480x480_4824243.jpg",
          source: "mp3/bijlee.mp3",
          url: "https://www.youtube.com/watch?v=NwdQx2P_ytk",
          favorited: true
        },
        {
          name: "Soch Liya ",
          artist: "Arijit Singh, Mithoon",
          cover: "https://i0.wp.com/99lyricstore.com/wp-content/uploads/2021/12/soch-liya-lyrics-arijit-singer.jpg",
          source: "mp3/Soch Liya - Radhe Shyam.mp3",
          url: "https://www.youtube.com/watch?v=euEGLJbe_P0",
          favorited: false
        },
        {
          name: "Barsaat Ki Dhun",
          artist: "Jubin Nautiyal",
          cover: "https://c.saavncdn.com/600/Barsaat-Ki-Dhun-Hindi-2021-20210720121009-500x500.jpg",
          source: "mp3/sunn.mp3",
          url: "https://www.youtube.com/watch?v=YIucrdfR6rI",
          favorited: true
        },
        {
          name: "Overdose",
          artist: "Grandson",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
          favorited: false
        },
        {
          name: "Rag'n'Bone Man",
          artist: "Human",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false
        },
         {
          name: "Tumse Bhi Jyada",
          artist: "Arijit Singh",
          cover: "img/tadap.jpg",
          source: "mp3/tadap.mp3",
          url: "https://www.youtube.com/watch?v=YHSJHHG5MQ0",
          favorited: false
        },
        {
          name: "Saans",
          artist: " Mohit",
          cover: "img/saan.jpg",
          source: "mp3/saans.mp3",
          url: "https://www.youtube.com/watch?v=VAt6TO2gdko",
          favorited: true
        },
         {
          name: "Beintehaan",
          artist: " Atif Aslam",
          cover: "img/be.jpg",
          source: "mp3/be.mp3",
          url: "https://www.youtube.com/watch?v=nD7F40pQpyc",
          favorited: true
        },

      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
