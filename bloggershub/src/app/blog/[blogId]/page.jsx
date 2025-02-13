import BlogAddCommentsCard from "@/components/blogCard/blogAddCommentsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const BlogItem = async ({ params }) => {
  const { blogId } = await params;
  return (
    <section className="flex justify-center py-20 w-full">
      <div className="flex flex-col justify-center md:justify-normal gap-4 px-10 w-full">
        <div className="min-w-96">
          <Card className="hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl">Blog Item {blogId}</CardTitle>
              <CardDescription>
                By <span className="font-bold">Rajesh Ranjan</span> | 13/02/2025
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="flex lg:flex-row flex-col gap-6 w-full text-md">
          <div className="rounded-lg w-full lg:w-1/2">
            <Image
              className="hover:shadow-md rounded-lg w-full"
              src="/images/blog.jpg"
              alt="blogImage"
              width={300}
              height={300}
            />
          </div>
          <Card className="hover:shadow-md p-4 w-full lg:w-1/2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A optio
              suscipit quidem cum perferendis sit inventore assumenda, sapiente
              alias beatae fugit nemo consequatur dignissimos corrupti quasi
              cupiditate. Id, libero repudiandae! Eum, inventore doloremque cum
              dolore esse tempora reiciendis saepe obcaecati, illo repellat
              sint! Ullam, animi numquam asperiores sint eveniet accusamus?
              Distinctio minus ab quis delectus doloribus? Modi quis esse quia!
              Maxime deleniti ipsum vitae eveniet maiores asperiores eum
              eligendi deserunt provident hic? Similique, alias! Voluptatum
              voluptatibus quasi iusto sint perspiciatis! Ullam provident iure
              tempore blanditiis, quam magnam fugiat laborum harum? Excepturi
              iusto nisi tenetur ullam doloribus quisquam, sit nulla est
              obcaecati rem delectus facilis voluptatibus at ipsum tempora
              assumenda, minus, explicabo repellendus deleniti dolorum
              blanditiis laudantium. A assumenda ut vero! A delectus blanditiis
              alias amet accusamus sapiente facilis, et iusto asperiores
              mollitia numquam! Quas quasi amet recusandae omnis hic aliquam
              exercitationem vel. Natus quia odio itaque unde maiores, vel est?
              Beatae repudiandae et ipsam delectus. Veritatis illum vero eius in
              fugiat, assumenda aliquid autem, voluptates tempore a doloribus
              perferendis sed, eligendi molestiae odit laborum nostrum. Eos quo
              soluta nihil veniam. Iusto, rem debitis, laborum earum tenetur
              ullam obcaecati, ab amet quo velit numquam quaerat? Nulla
              veritatis molestiae temporibus aliquid dolorem officiis aperiam
              unde. Deleniti explicabo, veniam atque iusto voluptatem debitis.
            </p>
          </Card>
        </div>
        <div className="min-w-96">
          <BlogAddCommentsCard />
        </div>
      </div>
    </section>
  );
};

export default BlogItem;
