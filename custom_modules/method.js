module.exports = {
	capitalize : (s) => {
	  if (typeof s !== 'string') return ''
	  return s.charAt(0).toUpperCase() + s.slice(1)
	},
	renderView: async function(model, defaultData, res, page, query, fileEjs){
		try{
			var resData = await defaultData;
			var number = await model.find(query).countDocuments().exec()
			var data = await model.find(query).sort({time:-1}).skip(96*(Number(page)-1)).limit(96).exec()
			resData.data 	 	= data;
			resData.page 	 	= Math.ceil(number/96);
			resData.pageCurrent = Number(page);
			resData.maxPrice	= Number((await model.find().sort({price:-1}).limit(1).exec())[0].price);
		}catch(e){
			console.log(e);
		}
		res.render(fileEjs, resData);
	},
	setPrice : function(query){
		if(query.price){
			var price = query.price
			query.price = {
				"$gt" : Number(price.split(",")[0])-1,
				"$lt" : Number(price.split(",")[1])+1
			}
		}
		var nameRegex = query.name
		query.name = { "$regex": new RegExp(nameRegex)}
		var specificationsRegex = query.specifications
		query.specifications = { "$regex": new RegExp(specificationsRegex)}
		return query;
	},
	removePageType : function (query){
		delete query.page;
	 	delete query.type;
		return query;
	}
}