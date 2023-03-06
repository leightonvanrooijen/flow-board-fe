import { render } from "@testing-library/react";
import { StoryCard } from "./StoryCard";

describe("StoryCard", () => {
  it("should display the title of the Story", () => {
    const title = "Hello";
    const { getByText } = render(
      <StoryCard id={"1"} title={title} type={"feature"} />
    );

    expect(getByText(title)).toBeTruthy();
  });
  it.skip("should display the type of the Story", () => {
    // const type = "defect";
    // const { getByRole } = render(
    //   <StoryCard id={"1"} title={"Hello"} type={type} />
    // );
  });
});
