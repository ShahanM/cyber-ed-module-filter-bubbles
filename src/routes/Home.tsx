import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [isFBWhatHidden, setIsFBWhatHidden] = useState<boolean>(true);
	const [isFBHowHidden, setIsFBHowHidden] = useState<boolean>(true);
	const [isFBSolutionHidden, setIsFBSolutionHidden] = useState<boolean>(true);
	return (
		<div>
			<div className="m-3 p-3">
				<h1 className="text-3xl font-bold">Module 5 - Filter Bubbles</h1>
				<p>
					Hey there! Welcome to your very own control panel that lets you peer into the inner workings of
					various algorithms. As you must have guessed by now, this is the
					<span className="font-bold"> Filter Bubble </span>
					module. That means, you will be able to play around with various algorithms, platforms, and
					simulations that contribute to the formation of filter bubbles.
				</p>
				<p>
					I hope you are as excited as I am! Let's begin by understanding filter bubbles.
					<span className="font-bold"> Do you know what is a filter bubble? </span>
				</p>
			</div>
			<div className="m-3 p-3">
				<h2 className="text-2xl mb-3">What is a Filter Bubble?</h2>
				<p>
					Filter bubbles are the result of algorithms used to personalize your experience on the internet.
					These algorithms are used by platforms like Google, Facebook, Amazon, and many others to show you
					content that they think you will like. This is done by using your personal data, such as your search
					history, your location, your interests, and many other things. The algorithms then use this data to
					predict what you will like, and
					<span className="font-bold"> show you content that they think you will like. </span>
				</p>
				<button onClick={() => setIsFBWhatHidden(!isFBWhatHidden)}>
					<span className="text-blue-600 cursor-pointer my-2">
						{isFBWhatHidden ? "Read more" : "Hide details"}
					</span>
				</button>
				{!isFBWhatHidden && (
					<div>
						<h3 className="font-bold my-2">Is peronalization bad?</h3>
						<p>
							No, it is not! Personalization is a great thing. It helps you find content that you will
							like. However, it can also be used to show you
							<span className="font-bold"> only the content that you will like</span>, even if it is not
							entirely correct.
						</p>
						<p>
							So, you might be wondering, how is this different from misinformation? Well, misinformation
							is when you are shown content that is not true or content that are misleading. Filter
							bubbles are different because they are not showing you incorrect information. They are
							showing you information that is correct, but they are not showing you all the information.
							They are only showing you the information that they think you will like.
						</p>
					</div>
				)}
			</div>
			<div className="m-3 p-3">
				<div className="flex">
					<h3 className="text-xl mb-3">How are filter bubbles formed?</h3>
					<Link to="/dispersion">
						<div className="flex justify-between w-40 ms-5 bg-blue-300 rounded-md p-1">
							Show me how! <ArrowRightEndOnRectangleIcon className="size-7" />
						</div>
					</Link>
				</div>
				<p>
					Filter bubbles are formed when algorithms show you content that the algorithm thinks you will like
					and agree with. Similarly, it will show you less content that you dislike or disagree with. This
					creates a bubble of content that you like, making it
					<span className="inlineEmph">
						harder for you to see content that the algorithm thinks you will dislike.
					</span>
					This in turn creates an information perception bias, where you are only shown information you agree
					with and are only exposed to people who agree with you. This is called a filter bubble.
				</p>
				<button onClick={() => setIsFBHowHidden(!isFBHowHidden)}>
					<span className="text-blue-600 cursor-pointer my-2">
						{isFBHowHidden ? "Read More" : "Hide Details"}
					</span>
				</button>
				{!isFBHowHidden && (
					<div>
						<h3 className="font-bold my-2">How can filter bubbles be harmful?</h3>
						<p>
							Imagine that you are a person who likes to read Marvel comics. You search for Marvel comics
							on Google, and you watch Marvel related videos on YouTube. Your friend also like comic books
							but is not familiar with Marvel. When you tell them about Marvel they are excited to find
							out more. Sadly, they tell you the next day that they did not like it. That is because the
							algorithms that are used by Google and YouTube are not showing your friend the same content
							that they are showing you. They are showing your friend content that they think your friend
							will like.
						</p>
						<p>
							Now, your other friend is not interested in comic books but likes Marvel movies. When you
							tell them about the comic you read, they can relate to it because their search results are
							showing them similar content to what you are showing them. So, you continue to share more on
							interest of Marvel comics, and your friend continues to share more on Marvel movies. Now,
							you are both sharing Marvel content with each other (movies and comics), but you are not
							sharing content that is not related to Marvel.
						</p>
						<p>
							Meanwhile, your original friend who is also into comic books could have introduced you to
							other comic book series that you might like. But, now you are only seeing Marvel content, so
							you are not exposed to other comic book series. This is how filter bubbles are formed. They
							are formed when you are only exposed to content that you like and are not exposed to
							different content.
						</p>
					</div>
				)}
			</div>
			<div className="m-3 p-3">
				<div className="flex">
					<h3 className="text-xl mb-3">How can we break out of filter bubbles?</h3>
					<Link to="/rssa">
						<div className="flex justify-between w-40 ms-5 bg-blue-300 rounded-md p-1">
							Tell me already! <ArrowRightEndOnRectangleIcon className="size-7" />
						</div>
					</Link>
				</div>
				<p>
					There are several ways to break out of the filter bubble. However, the most effective way is to is
					to try and understanding your preference better. So, you can try new things and see if you like
					them. Or look at other perspectives and try to
					<span className="inlineEmph">understand how your perspectives differ.</span>
				</p>
				<button onClick={() => setIsFBSolutionHidden(!isFBSolutionHidden)}>
					<span className="text-blue-600 cursor-pointer my-2">
						{isFBSolutionHidden ? "Read More" : "Hide Details"}
					</span>
				</button>
				{!isFBSolutionHidden && (
					<div>
						<h3 className="my-2 font-bold">
							Can we get personalized content but still get a different perspective?
						</h3>
						<p>
							{" "}
							Yes, we sure can. Imagine that you are a person who likes to read Marvel comics (if you
							haven't read the previous example on "How filter bubbles are formed?" I recommend reading
							that before continuing.)
						</p>
						<p>
							Now, you are a person who likes to read Marvel comics. Your new friend likes to read comics
							but is not familiar with Marvel. When they look for information on Marvel they are getting
							results that are not very interesting to them. So, they give up on Marvel and move on to
							another comic book series.
						</p>
						<p>
							Wouldn't it be nice, if you could show your friend content that you like and explain to why
							you like it? That way, they can get a different perspective on Marvel and see if they really
							do like it. Similarly, you can try the new comic book series that your friend is interested
							in. This way, you can both get personalized content but still get a different perspective.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
