const express = require('express');
const router = express.Router();

const courses =[
  {id:1,name: 'course1'},
  {id:2,name: 'course2'},
  {id:3,name: 'course3'},

 ]

router.get('/', (req,res)=>{
  res.send(courses);
});



router.get('/:id', (req,res)=>{
  const course= courses.find(c=> c.id===parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found');
  res.send(course);
  
})


router.post('/', (req,res)=>{
  const schema= Joi.object({
    name: Joi.string().min(3).required()
  });
  const result= schema.validate(req.body);
  //console.log(result);

  if(result.error) return res.status(400).send(result.error.details[0].message);
  const newCourse={id: courses.length+1,name: req.body.name};
  
  courses.push(newCourse);
  res.send(newCourse);

});


router.put('/:id', (req,res)=>{
  const course= courses.find(c=> c.id===parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found');

  const schema= Joi.object({
    name: Joi.string().min(3).required()
  });
  const result= schema.validate(req.body);

  if(result.error) return res.status(400).send(result.error.details[0].message);

  course.name=req.body.name;
  res.send(course);
});

router.delete('/:id', (req,res)=>{
  const course= courses.findIndex(c=> c.id===parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found');

  courses.splice(course,1);
  res.send(course);

  
})

module.exports = router;
