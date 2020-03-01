<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PhotoSphereViewer - cubemap demo</title>

  <link rel="stylesheet" href="../dist/photo-sphere-viewer.min.css">

  <style>
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }

    #photosphere {
      width: 100%;
      height: 100%;
    }

    .psv-button.custom-button {
      font-size: 22px;
      line-height: 20px;
    }
  </style>
</head>
<body>

<div id="photosphere"></div>

		<script src="../node_modules/three/build/three.js"></script>
		<script src="../node_modules/promise-polyfill/dist/polyfill.js"></script>
		<script src="../node_modules/uevent/uevent.js"></script>
		<script src="../node_modules/dot/doT.js"></script>
		<script src="../node_modules/nosleep.js/dist/NoSleep.js"></script>
		<script src="../node_modules/three/examples/js/controls/DeviceOrientationControls.js"></script>
		<script src="../node_modules/three/examples/js/effects/StereoEffect.js"></script>
		<script src="../dist/photo-sphere-viewer.js"></script>
		<script>
			var div = document.getElementById('photosphere');
			var PSV = new PhotoSphereViewer({
					panorama: '../img/00125.jpg',
					container: div,
					time_anim: 3000,
					navbar: true,
					default_long: Math.PI / 2,
					defaultZoomLvl:0,
					autorotateSpeed:'1rpm',
					moveSpeed:0.5,
					moveInertia:true,
					navbar_style: {
						backgroundColor: 'rgba(58, 67, 77, 0.7)'
					},
					navbar: [
          'autorotate', 'zoom', 'download', 'markers',
          {
            title: 'Change image',
            className: 'custom-button',
            content: '🔄',
            onClick: (function() {
              var i = 0;
              var loading = false;

              return function() {
                if (loading) {
                  return;
                }

                i = 1 - i;
                loading = true;
                PSV.clearMarkers();

                PSV.setPanorama('../img/0011.jpg', {zoom: 50}, true)
                  .then(function() {
                    PSV.setCaption('浴室');
                    loading = false;
                  });
              }
            }())
          },
          {
            title  : 'Random position',
            className: 'custom-button',
            content: '🔀',
            onClick: function() {
              PSV.animate({
                longitude: (Math.random() - 0.5) * 2 * Math.PI,
                latitude: (Math.random() - 0.5) * 3 / 4 * Math.PI,
                zoom: Math.random() * 60 + 20
              }, 1500);
            }
          },
          'caption', 'gyroscope', 'stereo', 'fullscreen'
        ],
        markers: [
        {
          // html marker with custom style
          id: 'text',
          longitude: -1.1,
          latitude: -0.3,
          html: '去浴室看看<img width=32 height=32 src="../img/pin-blue.png"/>',
          anchor: 'bottom right',
          scale: [0.5, 1.5],
          style: {
            maxWidth: '100px',
            color: 'white',
            fontSize: '20px',
            fontFamily: 'Helvetica, sans-serif',
            textAlign: 'center'
          },
          data:{
            mark:1
          }
        },
        {
          // circle marker
          id: 'circle',
          circle: 20,
          x: 2500,
          y: 1000,
          tooltip: 'A circle marker'
        }
      ]
            });

				PSV.on('select-marker', function(marker) {
						if (marker.data && marker.data.mark===1) {
								var loading = false;
								PSV.clearMarkers();
								if (loading) {
									return;
								}
								loading = true;
								PSV.setPanorama('../img/0011.jpg', {zoom: 50}, true)
								.then(function() {
                  PSV.setCaption('浴室');
                  PSV.setMarkers([ 
                    {
                      // html marker with custom style
                      id: 'text',
                      longitude: -1.1,
                      latitude: -0.3,
                      html: '去浴室看看<img width=32 height=32 src="../img/pin-blue.png"/>',
                      anchor: 'bottom right',
                      scale: [0.5, 1.5],
                      style: {
                        maxWidth: '100px',
                        color: 'white',
                        fontSize: '20px',
                        fontFamily: 'Helvetica, sans-serif',
                        textAlign: 'center'
                      },
                      data:{
                        mark:0
                      }
                    },
                  ]);
									loading = false;
								});
            }
            if (marker.data && marker.data.mark===0) {
								var loading = false;
								PSV.clearMarkers();
								if (loading) {
									return;
								}
								loading = true;
								PSV.setPanorama('../img/00125.jpg', {zoom: 50}, true)
								.then(function() {
                  PSV.setCaption('浴室');
									loading = false;
								});
						}
					});
		</script>
	</body>

</html>