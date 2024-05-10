Firstly we separated our upazila using Filter. Then we called the landsat 9 imagary and filtered it. After that we calculate the normalized difference of specific bands for vegetation. Then select some classes for specific ranges such as water in range less than -0.1, bare land ranges from -0.1 to 0.1 and so on. Then using pixelArea we calculated the area of all those classes.

[GEE code link](https://code.earthengine.google.com/2b11d693eb70a6c6a14c8942285bd821)

[NDVI Class Area Calculation Code](https://github.com/AtikulRahi/ndviClassArea/blob/main/ndviClassArea.js)

[NDVI Class Area Calculation image](https://github.com/AtikulRahi/ndviClassArea/blob/main/Area%20NDVI.JPG)
