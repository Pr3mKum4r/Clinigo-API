class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    filter(){
        //filtering
        //console.log(req.query);
        const queryObj = {...this.queryStr};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el=>{
            delete queryObj[el];
        })

        //advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr)); //Building the query first
        return this;
    }
    sort() {
        //sorting
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort('year') // default sorting
        }
        return this;
    }
    limitFields() {
        //field limiting
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else{
            this.query = this.query.select('-__v');
        }
        return this;
    }
    paginate() {
        //pagination
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 100;
        const skip = (page-1)*limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;