import React, { useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Breadcrumbs from "../../components/Breadcrumbs"
import Card from "../../components/Card"
import Checkbox from "../../components/Checkbox"
import ButtonLink from "../../components/ButtonLink"
import Link from "../../components/Link"
import Warning from "../../components/Warning"
import Tooltip from "../../components/Tooltip"
import CopyToClipboard from "../../components/CopyToClipboard"
import { Twemoji } from "react-emoji-render"
import CardList from "../../components/CardList"
import Img from "gatsby-image"

import { ButtonSecondary } from "../../components/SharedStyledComponents"

const Page = styled.div`
  width: 100%;
  display: flex;
  margin-top: 4rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const LeftColumn = styled.div`
  flex: 1 1 50%;
  padding: 2rem;
  padding-top: 5rem;
`

const RightColumn = styled(LeftColumn)`
  flex: 1 1 50%;
  padding-top: 8.5rem;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 1rem;
  }
`

const Title = styled.h1`
  font-weight: normal;
  font-size: 2rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 3.5rem;
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const StyledButton = styled(ButtonLink)`
  margin-top: 0rem;
  margin-bottom: 3rem;
`

const StyledLink = styled(Link)`
  margin-left: 1rem;
`

const StyledCard = styled(Card)`
  margin-bottom: 3rem;
  border: 0px;
  padding: 0rem;
`

const DumbTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 8px;
  width: 100%;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  background: ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 3px 3px 0px 0px;
  text-transform: uppercase;
  font-size: 14px;
`

const AddressCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: 2rem;
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin-bottom: 3rem;
`

const Address = styled.div`
    /* background: ${(props) => props.theme.colors.ednBackground};
    color: ${(props) => props.theme.colors.fail400};
    padding: 0.5rem; */
    font-family: "SFMono-Regular", monospace;
    border-radius: 2px;
    font-size: 2rem;
    flex-wrap: wrap;
    text-transform: uppercase;
    line-height: 140%;
    margin-bottom: 1rem;
`

const CopyButton = styled(ButtonSecondary)`
  margin-top: 0rem;
  margin-right: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-right: 0rem;
    margin-top: 1rem;
  }
`

const CardContainer = styled.div`
  margin: 2rem;
  margin-bottom: 0rem;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
  }
`

const TitleText = styled.div``

const CardTitle = styled.h2`
  margin-top: 0rem;
  font-weight: 500;
  margin-bottom: 1rem;
`

const Caption = styled.h6`
  color: ${(props) => props.theme.colors.text200};
  font-weight: 500;
  margin-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-bottom: 2rem;
  }
`

const SyledCheckbox = styled(Checkbox)`
  display: flex;
  min-height: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    min-height: 4rem;
  }
`

const Blockie = styled(Img)`
  border-radius: 4px;
`

const Icon = styled(Img)`
  margin-right: 0.5rem;
`

const IconLink = styled.div`
  display: flex;
  align-items: center;
`

// TODO confirm/update
const STAKING_CONTRACT_ADDRESS = "0x94fce6c90537f04b97253d649c15dbbccb5079c2"
const CHUNKED_ADDRESS = STAKING_CONTRACT_ADDRESS.match(/.{1,3}/g).join(" ")

const StakingAddressPage = ({ data, location }) => {
  const [state, setState] = useState({
    showAddress: false,
    hasUsedLaunchpad: false,
    understandsStaking: false,
    willCheckOtherSources: false,
  })

  const isButtonEnabled =
    state.hasUsedLaunchpad &&
    state.understandsStaking &&
    state.willCheckOtherSources

  const addressSources = [
    {
      title: "ConsenSys",
      link: "https://consensys.net",
      image: data.consensys.childImageSharp.fixed,
    },
    {
      title: "EthHub",
      link: "https://ethhub.io",
      image: data.ethhub.childImageSharp.fixed,
    },
    {
      title: "Etherscan",
      link: "https://etherscan.io/",
      image: data.etherscan.childImageSharp.fixed,
    },
  ]

  return (
    <Page>
      <LeftColumn>
        <Breadcrumbs slug={location.pathname} startDepth={1} />
        <Title>Check the Phase 0 staking address</Title>
        <Subtitle>
          This is the address for the Eth2 staking contract.
          <br /> Use this page to confirm you’re using the correct deposit
          address.
        </Subtitle>
        <h2>This is not where you stake</h2>
        <p>
          To stake your ETH in Eth2 you must use the dedicated launchpad product
          and follow the instructions. Sending ETH to this address will not make
          you a staker and will result in a failed transaction.{" "}
          <Link to="#">More on staking</Link>
        </p>
        {/* TODO add URL */}
        <StyledButton to="#">Stake using launchpad</StyledButton>
        <h2>Check these sources</h2>
        <p>
          We expect there to be a lot of fake addresses and scams out there. To
          be safe, check the Eth2 staking address you're using against the
          address on this page. We recommend checking it with other trustworthy
          sources too.
        </p>
        <CardList content={addressSources} />
      </LeftColumn>
      <RightColumn>
        {/* TODO reduce width of card and center in column */}
        <AddressCard>
          <DumbTag>Check staking address</DumbTag>
          <CardContainer>
            {!state.showAddress && (
              <>
                <Row>
                  <CardTitle>Confirm to reveal address</CardTitle>
                </Row>
                <SyledCheckbox
                  size={1.5}
                  checked={state.hasUsedLaunchpad}
                  callback={() =>
                    setState({
                      ...state,
                      hasUsedLaunchpad: !state.hasUsedLaunchpad,
                    })
                  }
                >
                  I’ve already used the launchpad to set up my Eth2 validator.
                </SyledCheckbox>
                <SyledCheckbox
                  size={1.5}
                  checked={state.understandsStaking}
                  callback={() =>
                    setState({
                      ...state,
                      understandsStaking: !state.understandsStaking,
                    })
                  }
                >
                  I understand not to send ETH to this address in order to
                  stake.
                </SyledCheckbox>
                <SyledCheckbox
                  size={1.5}
                  checked={state.willCheckOtherSources}
                  callback={() =>
                    setState({
                      ...state,
                      willCheckOtherSources: !state.willCheckOtherSources,
                    })
                  }
                >
                  I'm going to check with other sources.
                </SyledCheckbox>
                <CopyButton
                  disabled={!isButtonEnabled}
                  onClick={() =>
                    setState({ ...state, showAddress: !state.showAddress })
                  }
                >
                  <Twemoji svg text=":eyes:" /> Reveal address
                </CopyButton>
              </>
            )}
            {state.showAddress && (
              <>
                <Row>
                  <TitleText>
                    <CardTitle>Eth2 staking address</CardTitle>

                    {/* TODO add text-to-speech feature */}
                    {/* <div>
                      <Link to="#">Read address aloud</Link>{" "}
                      <Twemoji svg text=":cheering_megaphone:" />
                    </div> */}

                    <Caption>We have added spaces for legibility</Caption>
                  </TitleText>
                  <Blockie fixed={data.blockie.childImageSharp.fixed} />
                </Row>
                <Tooltip content="Check each character carefully.">
                  <Address>{CHUNKED_ADDRESS}</Address>
                </Tooltip>

                <ButtonRow>
                  <CopyToClipboard text={STAKING_CONTRACT_ADDRESS}>
                    {(isCopied) => (
                      <CopyButton>
                        {!isCopied ? (
                          <div>
                            <Twemoji svg text=":clipboard:" /> Copy address
                          </div>
                        ) : (
                          <div>
                            <Twemoji svg text=":white_check_mark:" /> Copied
                            address
                          </div>
                        )}
                      </CopyButton>
                    )}
                  </CopyToClipboard>
                  <Link
                    to={`https://etherscan.io/address/${STAKING_CONTRACT_ADDRESS}`}
                  >
                    View contract on Etherscan
                  </Link>
                </ButtonRow>
              </>
            )}
            <Warning emoji=":warning:">
              {/* TODO add URL */}
              <div>
                Sending funds to this address won’t work and won’t make you a
                staker. We will never ask you to send ETH without you first
                going through the <a href="#">the launchpad</a>.
              </div>
            </Warning>
          </CardContainer>
        </AddressCard>
      </RightColumn>
    </Page>
  )
}

export default StakingAddressPage

export const sourceImage = graphql`
  fragment sourceImage on File {
    childImageSharp {
      fixed(height: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    blockie: file(relativePath: { eq: "eth2-staking/example_blockie.png" }) {
      childImageSharp {
        fixed(width: 64) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    consensys: file(relativePath: { eq: "eth2-staking/consensys.png" }) {
      ...sourceImage
    }
    ethhub: file(relativePath: { eq: "eth2-staking/ethhub.png" }) {
      ...sourceImage
    }
    etherscan: file(
      relativePath: { eq: "eth2-staking/etherscan-logo-circle.png" }
    ) {
      ...sourceImage
    }
  }
`