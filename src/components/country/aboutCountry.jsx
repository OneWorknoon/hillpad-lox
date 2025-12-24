import { FiExternalLink } from "react-icons/fi";

export default function AboutCountry({ props }) {
  return (
    <div className="w-full" id="aboutCountry">
      <div>
        <div className="text-light_black w-full">
          <div dangerouslySetInnerHTML={{ __html: props.about }} />
        </div>
        <div className="w-full">
          <a
            href={props.about_wiki_link}
            target="_blank"
            className="text-light my-3 flex gap-2 items-center"
            rel="noreferrer"
          >
            <div>
              <FiExternalLink />
            </div>
            <div>Wikipedia</div>
          </a>
        </div>
      </div>
      <div>
        <div>
          <h2 className="font-bold text-xl mt-6">Trivia and Fun Facts</h2>
        </div>
        <div className="text-light font-bold mt-10 text-sm lg:text-base">
          Trivia and fun facts about {props.name}
        </div>
        <ul
          className="text-light_black list-disc mx-8"
          dangerouslySetInnerHTML={{ __html: props.trivia_facts }}
        />
      </div>
    </div>
  );
}
