import { Grid, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

export interface IBookFormValues {
  title: string;
  author: string;
  description: string;
  genre: string;
}

interface Props {
  onSubmit: (values: IBookFormValues) => void;
  initialValues?: IBookFormValues;
}
export const initialValuesForm: IBookFormValues = {
  title: "",
  author: "",
  description: "",
  genre: "",
};

const BookForm: React.FC<Props> = ({ onSubmit, initialValues }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
  });

  return (
    <Formik
      initialValues={initialValues || initialValuesForm}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form id="book-form">
          <Grid container spacing={2} sx={{ mb: 2, pt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Field
                name="title"
                as={TextField}
                label="Title"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="author"
                as={TextField}
                label="Author"
                error={touched.author && Boolean(errors.author)}
                helperText={touched.author && errors.author}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="description"
                as={TextField}
                label="Description"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="genre" as={TextField} label="Genre" fullWidth />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
