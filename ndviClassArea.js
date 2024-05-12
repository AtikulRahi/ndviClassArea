var roi = ee.FeatureCollection("projects/ee-learning-rahi/assets/BGD_adm3");
var upzla = roi.filter(ee.Filter.eq("NAME_3", "Maulvibazar S."))
Map.centerObject(upzla,10)
Map.addLayer(upzla,{},"Maulvibazar S.")

var s2 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
          .filterBounds(upzla)
          .filterDate('2022-01-01', '2022-12-31')
          .filter(ee.Filter.lt("CLOUD_COVER",10))
          //.first()
print(s2)
function calNDVI(image){
  var ndvi = image.normalizedDifference(["SR_B5","SR_B4"]).rename("NDVI")
  return ndvi
}
var ndviCollection = s2.map(calNDVI)
print(ndviCollection)
/*var ndvi = s2.normalizedDifference(["SR_B5","SR_B4"]).rename("NDVI")
print("NDVI", ndvi)*/
var ndvi2 = ndviCollection.median()
var vizParam = {
  min: -1,
  max: 1,
  palette: ["blue","cyan","lime","yellow","green",]
}
Map.addLayer(ndvi2.clip(upzla),vizParam,"NDVI")

var water = ndvi2.select('NDVI').lt(-0.1)
var bareLand = ndvi2.select('NDVI').gte(-0.1).and(ndvi2.select('NDVI').lt(0.1));
var grassLand = ndvi2.select('NDVI').gte(0.1).and(ndvi2.select('NDVI').lt(0.5));
var highVegetation = ndvi2.select('NDVI').gte(0.5);

var areaWater = water.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 30,
  bestEffort: true
});

var areaBareLand = bareLand.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 30,
  bestEffort: true
});

var areaGrassLand = grassLand.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 30,
  bestEffort: true
});

var areaHighVegetation = highVegetation.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 30,
  bestEffort: true
});

print('Area of Water bodies (in square meters):', areaWater.get('NDVI'));
print('Area of Bare Land (in square meters):', areaBareLand.get('NDVI'));
print('Area of Grass Land (in square meters):', areaGrassLand.get('NDVI'));
print('Area of High Vegetation (in square meters):', areaHighVegetation.get('NDVI'));
